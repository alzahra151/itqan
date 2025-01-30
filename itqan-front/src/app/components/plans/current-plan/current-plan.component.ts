import { Component, OnInit } from '@angular/core';
import { StrategicPlanService } from '../../../core/services/stratigic-plan/strategic-plan.service';
import { AddStratgyPlanComponent } from '../add-stratgy-plan/add-stratgy-plan.component';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-plan',
  standalone: true,
  imports: [AddStratgyPlanComponent],
  templateUrl: './current-plan.component.html',
  styleUrl: './current-plan.component.scss'
})
export class CurrentPlanComponent implements OnInit {
  plans: any = []
  associationId = localStorage.getItem('associationId') || ''
  currentPlan: any
  constructor(private statigyPlanService: StrategicPlanService, private router: Router) { }
  ngOnInit(): void {
    this.getCurrentPlan()
  }
  getCurrentPlan() {
    this.statigyPlanService.getstratigic_plans(JSON.parse(this.associationId)).subscribe({
      next: (data) => {
        this.plans = data
        console.log(this.plans)
        const currentYear = new Date().getFullYear();

        // Check end dates and set flags for components
        this.plans.result.plans.forEach((plan: any) => {
          const endDate = plan.end_date ? new Date(plan.end_date) : null;
          const startDate = plan.start_date ? new Date(plan.start_date) : null;
          console.log(plan.end_date, endDate, startDate)
          const endYear = endDate?.getFullYear();
          const startYear = startDate?.getFullYear();

          // Compare end year with current year
          console.log("endYear", endYear, "startYear", startYear)
          if (endYear && startYear && endYear >= currentYear && startYear <= currentYear) {
            // Plan has ended
            console.log("inside", startYear, endYear, currentYear)
            plan.status = 'active';
            this.currentPlan = plan
            console.log(this.currentPlan)
            this.router.navigate(['/home/plans', plan.id])
          } else {
            // Plan is ongoing or future
            plan.status = 'ended';
          }
        });
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
