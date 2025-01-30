import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExectivePlanService } from '../../../core/services/executive-plan/exective-plan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Beneficiary } from '../../../core/models/beneficiary';
import { BenficieryType } from '../../../core/models/benficiery-type';
import { Employee } from '../../../core/models/employee';
import { Service } from '../../../core/models/service';
import { Department } from '../../../core/models/department';
import { PhasedPlan } from '../../../core/models/phased-plan';
import { Activity } from '../../../core/models/activity';
import { SubGoal } from '../../../core/models/sub-goal';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { PhasedPlanService } from '../../../core/services/phased_plan/phased-plan.service';
import { ActivityService } from '../../../core/services/activity/activity.service';
import { AdministrationService } from '../../../core/services/administration/administration.service';
import { BeneficiaryCategoryService } from '../../../core/services/beneficiary_category/beneficiary-category.service';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { BeneficiaryService } from '../../../core/services/beneficiary/beneficiary.service';
import { ServiceService } from '../../../core/services/service/service.service';
import { IndicatorService } from '../../../core/services/indicator/indicator.service';
import { GoalService } from '../../../core/services/goal/goal.service';
import { Procedure } from '../../../core/models/procedure';
import { EnumUtils } from '../../../core/utils/enum-utils';
import { TreeModule } from 'primeng/tree';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-update-excutive-plan',
  standalone: true,
  imports: [
    TreeModule,
    FormsModule,
    CommonModule,
    AccordionModule,
    DropdownModule,
    CalendarModule,
    ReactiveFormsModule,
    DialogModule,
    ConfirmDialogModule,
    TableModule,
    MultiSelectModule
  ],
  providers: [ConfirmationService],
  templateUrl: './update-excutive-plan.component.html',
  styleUrl: './update-excutive-plan.component.scss'
})
export class UpdateExcutivePlanComponent {
  ExcutivePlanForm: FormGroup;
  // Add other properties as required
  planId: number = 0
  plan!: PhasedPlan
  activites: Activity[] = []
  employees: Employee[] = []
  // beneficiaryCats: BeneficiaryCategory[] = []
  administrations: any[] = []
  beneficiaryList: Employee[] | Beneficiary[] = []
  // ExcutivePlanForm: FormGroup;
  // emplyeeCount!: Employee
  visible: boolean = false
  plans: any
  sub_goal_id: any
  phased_plan_id: number = 0
  sub_gaol!: SubGoal
  type: { key: string, value: string }[];
  totalRecords!: number;
  loading: boolean = false;
  selectAll: boolean = false;
  cols: any[] = [];
  tableFirst?: number = 0
  departments: Department[] = []
  services: Service[] = []
  selectedbeneficiaries: Beneficiary[] = [];
  selectedEmployees: Employee[] = []
  beneficiaries: Beneficiary[] = []
  displayBeneficiary: boolean = false
  indicators: any[] = []
  test: Beneficiary[] = []
  planIndex: number = 0
  Benficierytype: BenficieryType = BenficieryType.Employee
  procedure: { key: string, value: string }[];
  associationId = localStorage.getItem('associationId') || ''
  emplyeeFilters = {
    name: '',
    gender: '',
    department_id: '',
  };
  beneficaryFilters = {
    name: '',
    file_no: '',
    contact_number: '',
    illness_name: '',
    serviceId: '',
    type: '',
    identity: '',
    end_date: '',
    start_date: '',
    minAge: '',
    maxAge: ''
  }

  constructor(
    private fb: FormBuilder,
    private exectivePlanService: ExectivePlanService,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private phasedPlanService: PhasedPlanService,
    private activityService: ActivityService,
    private administrationService: AdministrationService,
    private beneficiaryCateService: BeneficiaryCategoryService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private beneficaiaryService: BeneficiaryService,
    private serviceService: ServiceService,
    private indicatorServices: IndicatorService,
    private location: Location,
    private goalService: GoalService
    // Add other services as needed
  ) {
    this.ExcutivePlanForm = this.fb.group({
      name: [''],
      plan_name: [''],
      main_goal: [''],
      Requirements: [''],
      expected_impact: [''],
      cost: [0],
      description: [''],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      activity_id: [null, Validators.required],
      indicator_id: [null, Validators.required],
      type: [null, Validators.required],
      repetition: [false],
      automated_reports: [false],
      follow_up: [false],
      out_of_plan: [false],
      phased_plan_id: [null],
      sub_goal_id: [null],
      missions: this.fb.array([]),
      beneficiaryList: this.fb.array([]),
      beneficiaryemployeeList: this.fb.array([]),
      approval_employee_id: ['', Validators.required]
    });
    this.type = EnumUtils.getEnumValues(BenficieryType)
    this.procedure = EnumUtils.getEnumValues(Procedure)
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.planId = +params['id'];
      this.loadExecutivePlan(this.planId);
    });
    this.getActivities()
    this.getAdministrations()
    this.getEmployees()
    this.getBeneficiaries()
    this.getDepartments()
    this.getServices()
    this.getIndicators()
    // this.getStraticigPlan()
    this.loading = true;
    this.primengConfig.ripple = true;
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite()
      // this.associationId = JSON.parse(localStorage.getItem('associationId') || '')
    }
  }
  get missions(): FormArray {
    return this.ExcutivePlanForm.get('missions') as FormArray;
  }
  addMission() {
    const missions = this.ExcutivePlanForm.get('missions') as FormArray;
    missions.push(this.createMission());
  }
  deleteMission(index:number) {
    this.missions.removeAt(index);
  }

  planBeneficiaries(): FormArray {
    return this.ExcutivePlanForm.get('beneficiaryList') as FormArray;
  }
  Beneficiaryemployees(): FormArray {
    return this.ExcutivePlanForm.get('beneficiaryemployeeList') as FormArray;
  }
  loadExecutivePlan(id: number) {
    this.exectivePlanService.getPlanById(id).subscribe({
      next: (data) => {
        console.log(data)
        this.ExcutivePlanForm.patchValue(data.result.plan);
        this.ExcutivePlanForm.patchValue({
          start_date: new Date(data.result.plan.start_date || ''),
          end_date: new Date(data.result.plan.end_date || ''),
        })
        this.populateFormArrays(data.result.plan);
        console.log(data.result.plan.beneficiaryList)
        console.log(this.selectedbeneficiaries)
        this.selectedbeneficiaries = this.normalizeBeneficiaries(data.result.plan.beneficiaries);
        this.selectedEmployees = this.normalizeEmplyessBeneficiaries(data.result.plan.employeesbeneficiary);
        // Trigger onSelectChange based on saved type
        this.onSelectChange({ value: data.result.plan.type });
      },
      error: (error) => console.log(error)
    });
  }
  normalizeBeneficiaries(data: any) {
    return data.map((item: any) => {
      return {
        id: item.beneficiary.id, // or any other unique identifier you may need internally
        name: item.beneficiary.name,
        recordHistory: item.beneficiary.record_history,
        identity: item.beneficiary.identity, // or any other unique identifier you may need internally
        contact_numbers: item.beneficiary.contact_numbers,
        file_no: item.beneficiary.file_no,
        illnesse: item.beneficiary.illnesse,
        marital_status: item.beneficiary.marital_status,
        beneficiary_sevices: item.beneficiary.beneficiary_sevices
      };
    });
  }
  normalizeEmplyessBeneficiaries(data: any) {
    return data.map((item: any) => {
      return {
        id: item.employee.id, // or any other unique identifier you may need internally
        name: item.employee.name,
        address: item.employee.address,
        mobile: item.employee.mobile, // or any other unique identifier you may need internally
        department: item.employee.department,
      };
    });
  }
  onSelectChange(event: any) {
    console.log(event)
    if (event.value === null) {
      this.visible = false; // Or handle it however you need
      return; // Exit the function early
    }
    this.visible = true

    if (event.value == BenficieryType.Employee) {
      this.displayBeneficiary = false
      this.selectedbeneficiaries = []
    
    } else if (event.value == BenficieryType.Patient) {
      this.displayBeneficiary = true
      this.beneficaryFilters.type = BenficieryType.Patient
      this.getBeneficiaries()
      this.selectedEmployees = []
    }
  }
  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'هل انت متاكد من انك تريد حذف العنصر',
      header: 'تاكيد الحذف',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.updateExecutivePlan()
      },
      reject: () => {
        this.updateExecutivePlan()
      }
    });
  }
  onBeneficiarySelectionChange(value = []) {
    this.selectAll = value.length === this.beneficiaries.length;
    this.selectedbeneficiaries = value;
    console.log(this.selectedbeneficiaries)
    this.selectedEmployees = []
  }
  onEmplyeeSelectionChange(value = []) {
    this.selectAll = value.length === this.employees.length;
    this.selectedEmployees = value;
    this.selectedbeneficiaries = []
  }
  onEmployeeSelectAllChange(event: any) {
    const checked = event.checked;
    if (checked) {
      this.employeeService.getEmployees(this.emplyeeFilters, JSON.parse(this.associationId)).subscribe({
        next: (data) => {
          this.selectedEmployees = data.result.employees;
          console.log(this.selectedEmployees)
          this.selectAll = true;
        },
        error: (error) => {
          console.log(error)
        }
      })
    } else {
      this.selectedEmployees = [];
      this.selectAll = false;
    }
  }

  onbenficiarySelectAllChange(event: any) {
    const checked = event.checked;
    if (checked) {
      this.beneficaiaryService.getBeneficiaries(this.beneficaryFilters, JSON.parse(this.associationId)).subscribe({
        next: (data) => {
          this.selectedbeneficiaries = data.result.beneficiaries;
          this.test = this.selectedbeneficiaries
          this.selectedEmployees = []
          console.log(this.selectedbeneficiaries)
          this.selectAll = true;
        },
        error: (error) => {
          console.log(error)
        }
      })

    } else {
      this.selectedbeneficiaries = [];
      this.selectedEmployees = []
      console.log(this.selectedbeneficiaries)
      this.selectAll = false;
    }
  }
  onFilterChange(): void {
    this.getEmployees();
  }
  onBeneficiaryFilterChange() {
    this.getBeneficiaries()
  }
  populateFormArrays(data: any) {
    // Populate missions
    data.missions.forEach((mission: any) => {
      const missionForm = this.fb.group({
        id:[mission.id],
        name: [mission.name],
        start_date: [mission.start_date],
        end_date: [mission.end_date],
        number_value: [mission.number_value],
        evaluation_method: [mission.evaluation_method],
        procedure: [mission.procedure],
        procedure_date: [mission.procedure_date],
        description: [mission.description],
        employee_id: [mission.employee_id],
        administration_id: [mission.administration_id]
      });
      this.missions.push(missionForm);
    });
  }
  createMission(): FormGroup {
    return this.fb.group({
      name: [''],
      start_date: [],
      end_date: [],
      number_value: [''],
      evaluation_method: [''],
      procedure: [''],
      procedure_date: [],
      description: [''],
      employee_id: [null],
      administration_id: [],
    });
  }
  updateExecutivePlan() {
    console.log(this.planId)
    if (this.selectedbeneficiaries.length > 0) this.pushSelectedBenficiers()
    if (this.selectedEmployees.length > 0) this.pushSelectedEmplyees()
    this.exectivePlanService.updateExectivePlan(this.planId, this.ExcutivePlanForm.value).subscribe({
      next: (data) => {
        console.log('Update successful', data);
        this.location.back() // Navigate to list or detail page
      },
      error: (error) => console.log(error)
    });
  }
  getActivities() {
    this.activityService.getActivities(JSON.parse(this.associationId)).subscribe({
      next: (data) => {
        this.activites = data.result.activities
        console.log(this.activites)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getEmployees() {
    this.loading = true;
    this.employeeService.getEmployees(this.emplyeeFilters, JSON.parse(this.associationId)).subscribe({
      next: (data) => {
        this.employees = data.result.employees
        this.loading = false
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  getAdministrations() {
    this.administrationService.getAdministrations(JSON.parse(this.associationId)).subscribe({
      next: (data) => {
        this.administrations = data
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  getIndicators() {
    this.indicatorServices.getIndicatories(JSON.parse(this.associationId)).subscribe({
      next: (response) => {
        this.indicators = response.result.indicatories
        console.log("indicatores", this.indicators)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  getDepartments() {
    this.administrationService.getDeparments(JSON.parse(this.associationId)).subscribe({
      next: (data) => {
        this.departments = data.result.departments
        console.log(this.departments)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  getServices() {
    this.serviceService.getServices(JSON.parse(this.associationId)).subscribe({
      next: (data) => {
        this.services = data.result.services
        console.log(this.services)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  onDeparmentChange(event: any) {
    this.emplyeeFilters.department_id = event.value
    this.getEmployees();
  }
  onServiceChange(event: any) {
    console.log(event.value)
    this.beneficaryFilters.serviceId = event.value
    this.getBeneficiaries();
  }
  getBeneficiaries() {
    this.beneficaiaryService.getBeneficiaries(this.beneficaryFilters, JSON.parse(this.associationId)).subscribe({
      next: (data) => {
        this.beneficiaries = data.result.beneficiaries
        console.log(this.beneficiaries)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  pushSelectedBenficiers() {
    console.log("benficaryyyyyyy")
    const beneficiariesFormArray = this.ExcutivePlanForm.get('beneficiaryList') as FormArray;
    beneficiariesFormArray.reset();
    this.selectedbeneficiaries.forEach((beneficiary) => {
      this.planBeneficiaries().push(this.fb.group({
        id: [beneficiary.id],
        record_history: [beneficiary.record_history],
        file_no: [beneficiary.file_no],
        gender: [beneficiary.gender],
        birth_date: [beneficiary.birth_date],
        marital_status: [beneficiary.marital_status],
        nationality: [beneficiary.nationality],
        educational_level: [beneficiary.educational_level],
        job: [beneficiary.job],
        employer: [beneficiary.employer],
        monthly_income_from: [beneficiary.monthly_income_from],
        monthly_income_to: [beneficiary.monthly_income_to],
        housing_type: [beneficiary.housing_type],
        mobility_status: [beneficiary.mobility_status],
        email: [beneficiary.email],
        home_address: [beneficiary.home_address],
        work_address: [beneficiary.work_address],
        age: [beneficiary.age],
        type: [beneficiary.type],
      }));
    });

  }
  pushSelectedEmplyees() {
    console.log("employyyyyyyyy")
    const beneficiariesFormArray = this.ExcutivePlanForm.get('beneficiaryemployeeList') as FormArray;
    beneficiariesFormArray.reset();
    this.selectedEmployees.forEach((emplyee) => {
      this.Beneficiaryemployees().push(this.fb.group({
        id: [emplyee.id],
        name: [emplyee.id],
        job_number: [emplyee.job_number],
        ID_number: [emplyee.ID_number],
        address: [emplyee.address],
        gender: [emplyee.gender],
        age: [emplyee.age],
        mobile: [emplyee.mobile],
        image: [emplyee.image],
        department_id: [emplyee.department],
        role_id: [emplyee.role_id],
      }));
    });

  }
  backRoute() {
    this.location.back()
  }
  closeModal() {
    this.visible = false
  }
}
