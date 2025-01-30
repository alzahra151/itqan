import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { StrategicPlanService } from '../../../core/services/stratigic-plan/strategic-plan.service';
import { Router } from '@angular/router';
import { StratigicPlan } from '../../../core/models/stratigic-plan';
// import {  } from '@angular/common';
@Component({
  selector: 'app-add-stratgy-plan',
  standalone: true,
  imports: [
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './add-stratgy-plan.component.html',
  styleUrl: './add-stratgy-plan.component.scss'
})
export class AddStratgyPlanComponent {
  startDate: Date | undefined;
  endDate: Date | undefined
  strategicPlanForm: FormGroup;
  abbreviations: any[] = []
  submitted = false
    isEditMode = false; // Add a flag for edit mode
  plan:any
  associationId = localStorage.getItem('associationId') || ''
  constructor(private fb: FormBuilder, private stratigicPlanService: StrategicPlanService, private router: Router, private location: Location) {
    this.strategicPlanForm = this.fb.group({
      name: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      introduction: [''],
      association_id: [this.associationId, Validators.required],
      goals: this.fb.array([this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        abbreviation: [this.generateUniqueAbbreviation(), Validators.required]
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
    this.abbreviations = [...this.goals.value]
    this.goals.valueChanges.subscribe(changes => {
      console.log('Goals array changed:', this.abbreviations);
      this.abbreviations = [...this.goals.value]
      console.log(this.abbreviations)
      //  this.abbreviations=this.goals
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
    this.goals.push(this.fb.group({
      name: [''],
      description: [''],
      abbreviation: [this.generateUniqueAbbreviation()]
    }
    ));
  }

  addSubGoal() {
    this.sub_goals.push(this.fb.group({
      name: [''],
      description: [''],
      goal_abbreviation: ['']
    }));
  }
  // Method to remove a goal by index
  removeGoal(index: number) {
    this.goals.removeAt(index);
  }

  // Method to remove a sub-goal by index
  removeSubGoal(index: number) {
    this.sub_goals.removeAt(index);
  }

  addStratigicPlan() {
    // Handle form submission
    this.submitted = true
    if (this.strategicPlanForm.valid) {
      this.stratigicPlanService.addStratigic_plan(this.strategicPlanForm.value).subscribe({
        next: (data) => {
          console.log(data)
          this.submitted = false
          this.strategicPlanForm.reset()
          this.plan=data
          // this.router.navigate(['/home/add-phased-plan', this.plan.strategic_plan.id])
        },
        error: (error) => {
          console.log(error)
          // this.message = error.error.message
          // console.log(this.message)
        }
      })
    } else {

    }
  }
  private usedNumbers = new Set<number>(); // To track used numbers

  generateUniqueAbbreviation(): string {
    let number: number;

    do {
      // Generate a random 4-digit number (e.g., 1234)
      number = Math.floor(1000 + Math.random() * 9000);
    } while (this.usedNumbers.has(number)); // Ensure it hasn't been used

    // Mark this number as used
    this.usedNumbers.add(number);

    // Return as a string
    return number.toString();
  }
  backRoute(){
  this.location.back()
  }
}
