import { Component } from '@angular/core';
import { StrategicPlanService } from '../../../core/services/stratigic-plan/strategic-plan.service';

import { StratigicPlan } from '../../../core/models/stratigic-plan';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-strategic-plans',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './strategic-plans.component.html',
  styleUrl: './strategic-plans.component.scss'
})
export class StrategicPlansComponent {
  plans: any = []
  associationId = localStorage.getItem('associationId') || ''
  constructor(private statigyPlanService: StrategicPlanService) {

  }
  ngOnInit() {
    this.statigyPlanService.getstratigic_plans(JSON.parse(this.associationId)).subscribe({
      next: (data) => {
        this.plans = data
        console.log(this.plans)
        this.groupByMonth(this.plans.result.plans)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  groupByMonth(data: any) {
    const datePipe = new DatePipe('en-US');
    return data.reduce((acc: any, item: any) => {
      const month = datePipe.transform(item.start_date, 'MMMM yyyy') || 'Unknown Date';
      acc[month] = acc[month] || [];
      acc[month].push(item);
      console.log(acc)
      return acc;
    }, {});
  }
}
