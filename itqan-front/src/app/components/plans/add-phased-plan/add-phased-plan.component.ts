import { CommonModule ,Location} from '@angular/common';
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
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-add-phased-plan',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DropdownModule,
    CalendarModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule
  ],
  templateUrl: './add-phased-plan.component.html',
  styleUrl: './add-phased-plan.component.scss'
})
export class AddPhasedPlanComponent implements OnInit {
  planIdParam: number = 0
  strategicPlan!: StratigicPlan 
  selectedGoalId: number = 0
  subGoals: SubGoal[] = []
  goalDescrirtion: string | undefined = ''
  planForm: FormGroup
  submitted = false
  dropdownSettings={}
  constructor(private route: ActivatedRoute,
    private strategicPlanService: StrategicPlanService,
    private goalService: GoalService,
    private fb: FormBuilder,
    private phasedPlanService: PhasedPlanService,
    private router: Router,
    private location:Location
  ) {
    this.planForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      goal_id: ['', Validators.required],
      subGoals:[[]],
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
        this.getPlan(this.planIdParam)
        this.planForm.get('Strategic_plan_id')?.patchValue(this.planIdParam)
      }
    })
    this.dropdownSettings = {
      singleSelection: false,
      defaultOpen: false,
      idField: "id",
      textField: "name",
      selectAllText: "تحديد الكل ",
      unSelectAllText: "الغاء التحديد",
      // itemsShowLimit: 3
    };
  }
  getPlan(id: number) {
    this.strategicPlanService.getstratigic_planByID(id).subscribe({
      next: (data) => {
        this.strategicPlan = data.result?.plan
        console.log(this.strategicPlan)
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
    const goal = this.strategicPlan.goals?.find(item => item.id == this.selectedGoalId)
    this.goalDescrirtion = goal?.description
  }
  addPhasedPlan() {
    this.submitted=true
    this.phasedPlanService.addPhasedPlan(this.planForm.value).subscribe({
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
