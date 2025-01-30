import { Component, OnInit, inject } from '@angular/core';
import { ExectivePlanService } from '../../core/services/executive-plan/exective-plan.service';
import { ExectivePlan } from '../../core/models/exective-plan';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-approve-exectiveplan',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './approve-exectiveplan.component.html',
  styleUrl: './approve-exectiveplan.component.scss'
})
export class ApproveExectiveplanComponent implements OnInit {
  ngOnInit(): void {
    this.getPlans()
  }
  exexticePlanService = inject(ExectivePlanService)
  employee = localStorage.getItem('employee') || ''
  plans: ExectivePlan[] = []
  getPlans() {
    this.exexticePlanService.getEmplyeeExcutivePlaneToArrprovel(JSON.parse(this.employee).id).subscribe({
      next: (response) => {
        this.plans = response.result.plans
      }, error: (errro) => {
        console.log(errro.error.message)
      }
    })
  }

}
