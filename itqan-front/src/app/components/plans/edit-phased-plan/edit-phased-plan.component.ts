import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { StrategicPlanService } from '../../../core/services/stratigic-plan/strategic-plan.service';
import { StratigicPlan } from '../../../core/models/stratigic-plan';
import { GoalService } from '../../../core/services/goal/goal.service';
import { SubGoal } from '../../../core/models/sub-goal';
import { PhasedPlanService } from '../../../core/services/phased_plan/phased-plan.service';
import { PhasedPlan } from '../../../core/models/phased-plan';

@Component({
  selector: 'app-edit-phased-plan',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DropdownModule,
    CalendarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-phased-plan.component.html',
  styleUrl: './edit-phased-plan.component.scss'
})
export class EditPhasedPlanComponent {
  planIdParam: number = 0
  phasedPlan!: PhasedPlan
  stratigicPlan!: StratigicPlan
  selectedGoalId: number = 0
  subGoals: SubGoal[] = []
  goalDescrirtion: string | undefined = ''
  planForm: FormGroup
  submitted = false
  constructor(private route: ActivatedRoute,
    private statigicService: StrategicPlanService,
    private goalService: GoalService,
    private fb: FormBuilder,
    private phasedPlanService: PhasedPlanService,
    private router: Router,
    private location: Location
  ) {
    this.planForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      goal_id: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      Strategic_plan_id: [, Validators.required]
    })
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params)
      if (params['id']) {
        this.planIdParam = params['id'];
        const id = params['id']
        console.log(' id:', this.planIdParam, id);
        this.getPhasedPlan(this.planIdParam)
        // this.planForm.get('Strategic_plan_id')?.patchValue(this.planIdParam)
      }
    })
  }
  getPhasedPlan(id: number) {
    this.phasedPlanService.getPlanById(id).subscribe({
      next: (data) => {
        this.phasedPlan = data.result?.phased_plan
        console.log(this.phasedPlan)
        if (this.phasedPlan) {
          this.planForm.patchValue({
            title: data.result.phased_plan.title,
            start_date: new Date(data.result.phased_plan.start_date),
            end_date: new Date(data.result.phased_plan.end_date),
            description: data.result.phased_plan.description,
            subGoals: data.result.phased_plan.sub_goals,
            Strategic_plan_id: data.result.phased_plan.Strategic_plan?.id,
            goal_id: data.result.phased_plan.goal_id
          });
          this.getStratigicPlan(this.phasedPlan.Strategic_plan?.id)
          this.getSubGoals(this.planForm.get('goal_id')?.value)
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  getStratigicPlan(id: any) {
    this.statigicService.getstratigic_planByID(id).subscribe({
      next: (data) => {
        this.stratigicPlan = data.result?.plan
        console.log(this.phasedPlan)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  getSubGoals(goal_id: number) {
    this.goalService.getSubGoals(goal_id).subscribe({
      next: (data) => {
        this.subGoals = data.result?.sub_goals
        console.log(this.subGoals)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  selecteGoal(event: any) {
    this.selectedGoalId = event.value
    console.log(event.value)
    this.planForm.get('goal_id')?.patchValue(this.selectedGoalId)
    this.getSubGoals(this.selectedGoalId)
    const goal = this.stratigicPlan.goals?.find(item => item.id == this.selectedGoalId)
    this.goalDescrirtion = goal?.description
  }
 UpdatePhasedPlan() {
    this.submitted = true
   this.phasedPlanService.updatePlan(this.planIdParam,this.planForm.value).subscribe({
      next: (data) => {
        console.log('sucess', data)
        this.submitted = false
       this.location.back()
      }
    })
  }
  backRoute() {
    this.location.back()
  }
}
