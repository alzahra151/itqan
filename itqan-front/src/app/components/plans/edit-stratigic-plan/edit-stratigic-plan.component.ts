import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { StrategicPlanService } from '../../../core/services/stratigic-plan/strategic-plan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-edit-stratigic-plan',
  standalone: true,
  imports: [
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './edit-stratigic-plan.component.html',
  styleUrl: './edit-stratigic-plan.component.scss'
})
export class EditStratigicPlanComponent {
  startDate: Date | undefined;
  endDate: Date | undefined
  strategicPlanForm: FormGroup;
  abbreviations: any[] = []
  submitted = false
  isEditMode = false; // Add a flag for edit mode
  plan: any
  planId: number = 0
  associationId = localStorage.getItem('associationId') || ''
  constructor(private fb: FormBuilder, private stratigicPlanService: StrategicPlanService, private router: Router,
    private location: Location, private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute) {
    this.strategicPlanForm = this.fb.group({
      name: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      introduction: [''],
      association_id: [this.associationId, Validators.required],
      goals: this.fb.array([this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        abbreviation: ['', Validators.required]
      })]),
      sub_goals: this.fb.array([this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        goal_abbreviation: ['', Validators.required]
      }
      )])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.planId = params['id'];
        console.log(' parameter:', this.planId);
        this.loadStrategicPlan(this.planId)
      }
    })

    // If planId exists, we are in edit mode

    this.goals.valueChanges.subscribe(changes => {
      console.log('Goals array changed:', this.abbreviations);
      this.abbreviations = this.goals.value
      //  this.abbreviations=this.goals
      this.cdRef.detectChanges();
      console.log('Goals array changed:', this.abbreviations);
    });
  }

  get goals() {
    return this.strategicPlanForm.get('goals') as FormArray;
  }

  get sub_goals() {
    return this.strategicPlanForm.get('sub_goals') as FormArray;
  }

  addGoal() {
    this.goals.push(
      this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        abbreviation: ['', Validators.required],
      })
    );
  }

  addSubGoal() {
    this.sub_goals.push(
      this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        goal_abbreviation: ['', Validators.required],
      })
    );
  }
  // Method to remove a goal by index
  removeGoal(index: number) {
    this.goals.removeAt(index);
  }

  // Method to remove a sub-goal by index
  removeSubGoal(index: number) {
    this.sub_goals.removeAt(index);
  }


  loadStrategicPlan(id: number) {
    this.stratigicPlanService.getstratigic_planByID(id).subscribe({
      next: (data) => {
        // Patch form data
        // const start_date= 
        this.strategicPlanForm.patchValue({
          name: data.result.plan.name,
          start_date: new Date(data.result.plan.start_date),
          end_date: new Date(data.result.plan.end_date),
          introduction: data.result.plan.introduction,
          association_id: data.result.plan.association_id,
        });

        // Populate goals
        this.goals.clear();
        data.result.plan.goals?.forEach((goal: any) => {
          this.goals.push(this.fb.group({
            id: goal.id,
            name: goal.name,
            description: goal.description,
            abbreviation: goal.abbreviation,
          }));
        });

        // Populate sub-goals
        this.sub_goals.clear();
        data.result.plan.sub_goals?.forEach((subGoal: any) => {
          this.sub_goals.push(this.fb.group({
            id: subGoal.id,
            name: subGoal.name,
            description: subGoal.description,
            goal_abbreviation: subGoal.goal_abbreviation,
          }));
        });
      },
      error: (err) => {
        console.log(err)
      }
    }
    );
  }
  updateStrategicPlan() {
    this.submitted = true
    if (this.strategicPlanForm.valid) {
      this.stratigicPlanService.updatePlan(this.planId, this.strategicPlanForm.value).subscribe({
        next: (data) => {
          console.log('Plan updated successfully:', data);
          this.router.navigate(['/home/plans', this.planId]);
        },
        error: (error) => {
          console.error('Error updating plan:', error);
        },
      });
    }
  }

  backRoute() {
    this.location.back()
  }
}
