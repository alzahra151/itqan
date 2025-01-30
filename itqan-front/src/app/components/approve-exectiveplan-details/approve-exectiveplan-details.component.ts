import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExectivePlanService } from '../../core/services/executive-plan/exective-plan.service';
import { ExectivePlan } from '../../core/models/exective-plan';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-approve-exectiveplan-details',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    TableModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './approve-exectiveplan-details.component.html',
  styleUrl: './approve-exectiveplan-details.component.scss'
})
export class ApproveExectiveplanDetailsComponent {
  route = inject(ActivatedRoute)
  exectivePlaneservice = inject(ExectivePlanService)
  plan: ExectivePlan = {}
  visible: boolean = false
  planId: number = 0
  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params) {
        this.planId = params['id'];
        console.log(' parameter:', this.planId);
        this.getPlanByID()
      }
    })
  }
  getPlanByID() {
    this.exectivePlaneservice.getPlanById(this.planId).subscribe({
      next: (data) => {
        this.plan = data.result.plan
        console.log(this.plan)
      }, error: (error) => {
        console.log(error)
      }
    })
  }
  showDialog() {
    this.visible = true
  }
  approvalExextivePlan(planId: any) {
    this.exectivePlaneservice.approveExectivePlan(planId, { "approval": true }).subscribe({
      next: (data) => {
        console.log("updated success", data)
        this.getPlanByID()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
