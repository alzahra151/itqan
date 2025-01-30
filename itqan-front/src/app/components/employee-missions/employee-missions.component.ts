import { Component, forwardRef, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PhasedPlan } from '../../core/models/phased-plan';
import { PhasedPlanService } from '../../core/services/phased_plan/phased-plan.service';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { IRole } from '../../core/models/role';
import { RoleService } from '../../core/services/role/role.service';
import { ExectivePlanService } from '../../core/services/executive-plan/exective-plan.service';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompletedMissionService } from '../../core/services/competed-mission/completed-mission.service';
import { TooltipModule } from 'primeng/tooltip';
import { MissionService } from '../../core/services/mission/mission.service';
import { response } from 'express';
import { Mission } from '../../core/models/mission';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-employee-missions',
  standalone: true,
  imports: [
    // CommonModule,
    // AccordionModule,
    // CalendarModule,
    // DialogModule,
    // TableModule,
    // ReactiveFormsModule,
    // FormsModule,
    // TooltipModule,
    RouterLink,
    TranslateModule
    
  ],
  providers: [

  ],
  templateUrl: './employee-missions.component.html',
  styleUrl: './employee-missions.component.scss'
})
export class EmployeeMissionsComponent {
  planIdParam: number = 0
  plan!: PhasedPlan
  visible: boolean = false
  employee = localStorage.getItem('employee') || ''
  employeeId = JSON.parse(this.employee).id
  missionService = inject(MissionService)
  missions: Mission[] = []
  constructor(private translate: TranslateService) { }
  ngOnInit() {
    this.getEmplyeeMissions()
  }
  getEmplyeeMissions() {
    this.missionService.getEmployeeMissions(this.employeeId).subscribe({
      next: (response) => {
        this.missions = response.result.missions
        console.log(this.missions)
      }, error: (error) => {
        console.log(error.error.message)
      }
    })
  }

}
