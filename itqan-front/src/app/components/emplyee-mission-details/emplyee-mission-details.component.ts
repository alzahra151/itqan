import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from '../../core/services/mission/mission.service';
import { Mission } from '../../core/models/mission';
import { CommonModule, Location } from '@angular/common';
import { BeneficiaryService } from '../../core/services/beneficiary/beneficiary.service';
import { Beneficiary } from '../../core/models/beneficiary';
import { TableModule } from 'primeng/table';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Procedure } from '../../core/models/procedure';
import { EmployeeService } from '../../core/services/employee/employee.service';
import { Employee } from '../../core/models/employee';
import { CalendarModule } from 'primeng/calendar';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-emplyee-mission-details',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ProgressBarModule,
    ConfirmDialogModule,
    TranslateModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './emplyee-mission-details.component.html',
  styleUrl: './emplyee-mission-details.component.scss'
})
export class EmplyeeMissionDetailsComponent {
  route = inject(ActivatedRoute)
  missionservice = inject(MissionService)
  beneficaieyService = inject(BeneficiaryService)
  emplyeeService = inject(EmployeeService)
  mission!: Mission
  beneficiaries: any
  employees: any
  visible: boolean = false
  missionID: number = 0
  progress = 0; // Progress percentage
  isComplete = false; // Completion status
  completedProcedureForm: FormGroup
  procedureTypes: Procedure = Procedure.approval
  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService,
    private messageService: MessageService,private location:Location) {
    this.completedProcedureForm = this.fb.group({
      date: [null, Validators.required], // Date field
      procedure: [null, Validators.required],
      number_value: [null, [Validators.required, Validators.min(0)]], // Numeric field
      description: ['', Validators.required], // Text field
      mission_id: [this.missionID, Validators.required], // Dropdown or ID
    });
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params) {
        this.missionID = params['id'];
        console.log(' parameter:', this.missionID);
        this.getmissionByID()
        this.completedProcedureForm.get('mission_id')?.patchValue(this.missionID)
      }
    })
  }
  getmissionByID() {
    this.missionservice.getMissionById(this.missionID).subscribe({
      next: (data) => {
        this.mission = data.result.mission
        console.log(this.mission)
        this.getBenficairyEmployees()
        this.getBenficaireies()

      }, error: (error) => {
        console.log(error)
      }
    })
  }
  getBenficaireies() {
    this.beneficaieyService.getBeneficiariesByExectivePlanId(this.mission.executive_plan_id).subscribe({
      next: (data) => {
        this.beneficiaries = data.result.beneficiaries
        console.log(this.beneficiaries.length)
        this.updateProgress()
      }, error: (error) => {
        console.log(error)
      }
    })
  }
  getBenficairyEmployees() {
    this.emplyeeService.getEmployeeesByExcutivePlanId(this.mission.executive_plan_id).subscribe({
      next: (data) => {
        this.employees = data.result.employees
        console.log(this.employees.length)
        this.updateProgress()
      }, error: (error) => {
        console.log(error)
      }
    })
  }
  updateList() {
    this.beneficiaries
    if (this.beneficiaries.length > 0) {
      this.beneficaieyService.updateBeneficiariesByExectivePlanId(this.beneficiaries).subscribe({
        next: (data) => {
          this.getBenficaireies()
          this.updateProgress()
          console.log(this.beneficiaries)
        }, error: (error) => {
          console.log(error)
        }
      })
    } else if (this.employees.length > 0) {
      this.beneficaieyService.updateBeneficiaryEmolyessByExectivePlanId(this.employees).subscribe({
        next: (data) => {
          this.getBenficairyEmployees()
          this.updateProgress()
          console.log(this.beneficiaries)
        }, error: (error) => {
          console.log(error)
        }
      })
    }

  }
  startMission() {
    this.missionservice.updateMission(this.missionID, { status: "continues" }).subscribe({
      next: (data) => {
        console.log(data)
        this.getmissionByID()

      }, error: (error) => {
        console.log(error)
      }
    })
  }
  finshMission() {
    this.missionservice.updateMission(this.missionID, { status: "completed" }).subscribe({
      next: (data) => {
        console.log(data)
        this.getmissionByID()
         this.location.back()
      }, error: (error) => {
        console.log(error)
      }
    })
  }
  approveMission() {
    this.missionservice.approveMission(this.missionID).subscribe({
      next: (data) => {
        console.log(data)
        this.getmissionByID()

      }, error: (error) => {
        console.log(error)
      }
    })
  }
  addCompletedProcedure() {
    this.missionservice.addCompletedProcedure(this.completedProcedureForm.value).subscribe({
      next: (data) => {
        console.log(data)
        this.getmissionByID()

      }, error: (error) => {
        console.log(error)
      }
    })
  }
  updateProgress(): void {
    console.log("progress", this.progress)
    console.log(this.beneficiaries.length)
    console.log(this.employees.length)
    let total;
    let completed
    if (this.beneficiaries.length > 0) {
      total = this.beneficiaries.length;
      console.log("total", total)
      completed = this.beneficiaries.filter((item: any) => item.service_done).length;
    }
    if (this.employees.length > 0) {
      total = this.employees.length;
      console.log("total", total)
      completed = this.employees.filter((item: any) => item.service_done).length;
      console.log("completed", completed)
    }
    // Calculate progress percentage
    this.progress = (completed / total) * 100;
    console.log(this.progress)
    // Check if all items are complete
    if (this.mission.executive_plan.completion_requires_beneficiaries && completed === total) {
      if (this.mission.status !="completed")  this.confirmCompleteMission()

    } else if (!this.mission.executive_plan.completion_requires_beneficiaries && this.mission.number_value > 0) {
      this.isComplete = false;
      this.calculateProcedures()
    }
  }
  calculateProcedures(): void {
    const totalNumberValue = this.mission.completed_procedures.reduce(
      (sum: any, procedure: any) => sum + (procedure.number_value || 0),
      0
    );
    console.log(totalNumberValue)
    const isComplete = totalNumberValue >= this.mission.number_value;
    if (isComplete) this.confirmCompleteMission()
  }
  confirmCompleteMission() {
    this.confirmationService.confirm({
      message: `لقد تمت المهمة `,
      header: 'تأكيد ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.finshMission();
      },
    });
  }
}
