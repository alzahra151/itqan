import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { Component, DestroyRef, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { ExectivePlanService } from '../../../core/services/executive-plan/exective-plan.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { StrategicPlanService } from '../../../core/services/stratigic-plan/strategic-plan.service';
import { ActivityService } from '../../../core/services/activity/activity.service';
import { AdministrationService } from '../../../core/services/administration/administration.service';
import { BeneficiaryCategoryService } from '../../../core/services/beneficiary_category/beneficiary-category.service';
import { StratigicPlan } from '../../../core/models/stratigic-plan';
import { Activity } from '../../../core/models/activity';
import { BeneficiaryCategory } from '../../../core/models/beneficiary-category';
import { Employee } from '../../../core/models/employee';
import { Administration } from '../../../core/models/administration';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CalendarModule } from 'primeng/calendar';
import { initFlowbite } from 'flowbite';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { PhasedPlanService } from '../../../core/services/phased_plan/phased-plan.service';
import { PhasedPlan } from '../../../core/models/phased-plan';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EnumUtils } from '../../../core/utils/enum-utils';
import { BenficieryType } from '../../../core/models/benficiery-type';
import { Beneficiary, beneficiaryResponse } from '../../../core/models/beneficiary';
import { Table, TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { Department } from '../../../core/models/department';
import { BeneficiaryService } from '../../../core/services/beneficiary/beneficiary.service';
import { ServiceService } from '../../../core/services/service/service.service';
import { Service } from '../../../core/models/service';
import { Procedure } from '../../../core/models/procedure';
import { IndicatorService } from '../../../core/services/indicator/indicator.service';
import { GoalService } from '../../../core/services/goal/goal.service';
import { SubGoal } from '../../../core/models/sub-goal';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RepeatType } from '../../../core/models/repeat-type';
import { ExpectedImpactService } from '../../../core/services/expected_impact/expected-impact.service';
import { BeneficiaryEmployeesComponent } from '../../beneficiery-lists/beneficiary-employees/beneficiary-employees.component';
import { DirectorsBoardMembersService } from '../../../core/services/directors_board_members/directors-board-members.service';
import { DirectorsBoardMembers } from '../../../core/models/directors-board-members';
import { BeneficiaryDirectorBoardComponent } from '../../beneficiery-lists/beneficiary-director-board/beneficiary-director-board.component';
// import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-add-executive-plan',
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
    MultiSelectModule,
    NgMultiSelectDropDownModule,
    BeneficiaryEmployeesComponent,
    BeneficiaryDirectorBoardComponent
  ],
  providers: [
    ConfirmationService
  ],
  templateUrl: './add-executive-plan.component.html',
  styleUrl: './add-executive-plan.component.scss'
})
export class AddExecutivePlanComponent implements OnInit {
  date2!: Date
  startDate: any
  plan!: PhasedPlan
  activites: Activity[] = []
  employees: Employee[] = []
  beneficiaryCats: BeneficiaryCategory[] = []
  administrations: any[] = []
  beneficiaryList: Employee[] | Beneficiary[] = []
  ExcutivePlanForm: FormGroup;
  dropdownSettings = {};
  // emplyeeCount!: Employee
  visible: boolean = false
  visible2: boolean = false
  addIndicatorVisible: boolean = false
  addActivityVisible: boolean = false
  addExpected_impactVisible: boolean = false
  plans: any
  sub_goal_id: any
  phased_plan_id: number = 0
  sub_gaol!: SubGoal
  type: { key: string, value: string }[];
  repeate_type: { key: string, value: string }[];
  totalRecords!: number;
  loading: boolean = false;
  selectAll: boolean = false;
  cols: any[] = [];
  tableFirst?: number = 0
  departments: Department[] = []
  services: Service[] = []
  selectedbeneficiaries: Beneficiary[] = [];
  selectedEmployees: Employee[] = []
  selectedDirecBoard: DirectorsBoardMembers[]=[]
  beneficiaries: Beneficiary[] = []
  displayEmplyees: boolean = false
  indicators: any[] = []
  expectedImpacts: any
  test: Beneficiary[] = []
  planIndex: number = 0
  Benficierytype: BenficieryType = BenficieryType.Employee
  procedure: { key: string, value: string }[];
  associationId = localStorage.getItem('associationId') || ''
  indicatorIds: number[] = []
  directorBoardsMemebers:DirectorsBoardMembers[]=[]
  beneficaiaryTypeParam: string = ''
  addIndicatorForm: FormGroup
  addActivityForm: FormGroup
  addExpected_impactForm: FormGroup
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
  destroyRef = inject(DestroyRef);
  constructor(
    private exectivePlanService: ExectivePlanService,
    private employeeService: EmployeeService,
    private phasedPlanService: PhasedPlanService,
    private activityService: ActivityService,
    private administrationService: AdministrationService,
    private beneficiaryCateService: BeneficiaryCategoryService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private primengConfig: PrimeNGConfig,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private beneficaiaryService: BeneficiaryService,
    private serviceService: ServiceService,
    private indicatorServices: IndicatorService,
    private location: Location,
    private goalService: GoalService,
    private expectedImpactService: ExpectedImpactService,
    private directorBoardService:DirectorsBoardMembersService
  ) {
    this.ExcutivePlanForm = this.fb.group({
      name: [''],
      plan_name: [''],
      main_goal: [''],
      Requirements: [''],
      expected_impacts: [[]],
      implementation_place: [''],
      cost: [0],
      description: [''],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      activity_id: [null, Validators.required],
      indicators: [[], Validators.required],
      type: [this.beneficaiaryTypeParam, Validators.required],
      repetition: [false],
      automated_reports: [false],
      follow_up: [false],
      out_of_plan: [false],
      phased_plan_id: [this.phased_plan_id],
      sub_goal_id: [this.sub_goal_id],
      missions: this.fb.array([this.createMission()]),
      beneficiaryList: this.fb.array([]),
      beneficiaryemployeeList: this.fb.array([]),
      BeneficiaryeDirectBoardMembers: this.fb.array([]),
      repeat_type: ['none', Validators.required],
      repeat_until: [null, Validators.required], // Optional end date for repetition
      repeat_interval: [, Validators.required], // e.g., repeat every '2' days or months
      // approval_employee_id: ['', Validators.required]
      repetition_on_faild: [false, Validators.required],
      completion_requires_beneficiaries: [false, Validators.required],
      is_original: [true, Validators.required],
    });
    this.addIndicatorForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      association_id: [this.associationId, Validators.required],
      target: [, Validators.required]
    })
    this.addActivityForm = this.fb.group({
      name: ['', Validators.required],
      description: ['',],
      association_id: [this.associationId, Validators.required]
    })
    this.addExpected_impactForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      association_id: [this.associationId, Validators.required],
      target: [, Validators.required]
    })
    this.type = EnumUtils.getEnumValues(BenficieryType)
    this.procedure = EnumUtils.getEnumValues(Procedure)
    this.repeate_type = EnumUtils.getEnumValues(RepeatType)
  }
  get executivePlans(): FormArray {
    return this.ExcutivePlanForm.get('executive_plans') as FormArray;
  }
  missions(): FormArray {
    return this.ExcutivePlanForm.get('missions') as FormArray;
  }
  planBeneficiaries(): FormArray {
    return this.ExcutivePlanForm.get('beneficiaryList') as FormArray;
  }
  Beneficiaryemployees(): FormArray {
    return this.ExcutivePlanForm.get('beneficiaryemployeeList') as FormArray;
  }
  BeneficiaryeDirectBoardMembers(): FormArray{
    return this.ExcutivePlanForm.get('BeneficiaryeDirectBoardMembers') as FormArray;
  }
  createMission(): FormGroup {
    return this.fb.group({
      name: [''],
      start_date: [],
      end_date: [],
      number_value: [],
      reminder_date: [''],
      procedure: [''],
      procedure_date: [],
      description: [''],
      employee_id: [null],
      administration_id: [],
    });
  }
  addMission() {
    const missions = this.ExcutivePlanForm.get('missions') as FormArray;
    missions.push(this.createMission());
  }
  deleteMission(index: number) {
    this.missions().removeAt(index);
  }
  ngOnInit() {
    this.getActivities()
    this.getAdministrations()
    this.getBeneficieryCats()
    this.getEmployees()
    // this.getBeneficiaries()
    this.getDepartments()
    this.getServices()
    this.getIndicators()
    this.getExpectedImpacts()
    this.loading = true;
    this.primengConfig.ripple = true;
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite()
      // this.associationId = JSON.parse(localStorage.getItem('associationId') || '')
    }
    this.route.params.subscribe((params) => {
      console.log(params)
      if (params['sub_goal_id'] && params['phased_plan_id']) {
        this.sub_goal_id = +params['sub_goal_id'];
        console.log(this.sub_goal_id)
        this.phased_plan_id = +params['phased_plan_id']
        this.goalService.getSubGoalByID(this.sub_goal_id).subscribe({
          next: (data) => {
            this.sub_gaol = data.result.sub_goal
            console.log(this.sub_gaol)
            this.ExcutivePlanForm.get('phased_plan_id')?.patchValue(this.phased_plan_id)
            this.ExcutivePlanForm.get('sub_goal_id')?.patchValue(this.sub_goal_id)
            this.getPhasedPlanById(this.phased_plan_id)
          },
          error: (error) => {
            console.log(error)
          }
        })
      }
      this.beneficaiaryTypeParam = this.route.snapshot.queryParamMap.get('beneficiariesType') || '';
      if (this.beneficaiaryTypeParam) {
        if (this.beneficaiaryTypeParam == "الموظفين") this.displayEmplyees = true
        if (this.beneficaiaryTypeParam == "المرضى") this.getBeneficiaries()
        if (this.beneficaiaryTypeParam == "مجلس الادارة") this.getDirectorsBoard()
        this.ExcutivePlanForm.get('type')?.patchValue(this.beneficaiaryTypeParam)
      }
      console.log(this.beneficaiaryTypeParam)
    })
    this.dropdownSettings = {
      singleSelection: false,
      defaultOpen: false,
      idField: "id",
      textField: "title",
      selectAllText: "تحديد الكل ",
      unSelectAllText: "الغاء التحديد",
      // itemsShowLimit: 3
    };
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
  getBeneficieryCats() {
    this.beneficiaryCateService.getBeneficiary_categories().subscribe({
      next: (data) => {
        this.beneficiaryCats = data
        console.log(this.beneficiaryCats)
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
  getDirectorsBoard() {
    this.loading = true;
    this.directorBoardService.getDirectorsBoardMembers( JSON.parse(this.associationId)).subscribe({
      next: (data) => {
        this.directorBoardsMemebers = data.result.Directors_board_members
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
  getExpectedImpacts() {
    this.expectedImpactService.getExpected_impact(JSON.parse(this.associationId)).subscribe({
      next: (response) => {
        this.expectedImpacts = response
        console.log("expectedImpacts", this.expectedImpacts)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  addExecutivePlan() {
    if (this.selectedbeneficiaries.length > 0) this.pushSelectedBenficiers()
    if (this.selectedEmployees.length > 0) this.pushSelectedEmplyees()
    if (this.selectedDirecBoard.length > 0) this.pushSelectedDirectorBoard()
    this.exectivePlanService.addExectivePlan(this.ExcutivePlanForm.value).subscribe({
      next: (data) => {
        console.log(data)
        this.ExcutivePlanForm.reset()
        // this.router.navigate([url, param])
        this.location.back()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  getPhasedPlanById(planIdParam:any) {
    this.phasedPlanService.getPlanById(planIdParam).subscribe({
      next: (data) => {
        this.plan = data.result.phased_plan
        console.log(this.plan)
    
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  // onSelectChange(event: any) {
  //   console.log(event)
  //   if (event.value === null) {
  //     this.visible = false; // Or handle it however you need
  //     return; // Exit the function early
  //   }
  //   this.visible = true

  //   if (event.value == BenficieryType.Employee) {
  //     this.displayBeneficiary = false
  //     this.selectedbeneficiaries=[]
  //   } else if (event.value == BenficieryType.Community) {
  //     this.displayBeneficiary = true
  //     this.selectedEmployees=[]
  //     this.beneficaryFilters.type = BenficieryType.Community
  //     console.log(event.value, BenficieryType.Community, this.beneficaryFilters)
  //     this.getBeneficiaries()
  //   } else if (event.value == BenficieryType.Patient) {
  //     this.displayBeneficiary = true
  //     this.beneficaryFilters.type = BenficieryType.Patient
  //     this.getBeneficiaries()
  //     this.selectedEmployees=[]
  //   }
  // }
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
        this.addExecutivePlan()
      },
      reject: () => {
        this.addExecutivePlan()
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
  onDirectorBoardsMemebersSelectionChange(value = []) {
    this.selectAll = value.length === this.directorBoardsMemebers.length;
    this.selectedDirecBoard = value;
    this.selectedbeneficiaries = []
    this.selectedEmployees = []
    console.log(this.selectedDirecBoard)
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
  onDiectorsBoardSelectAllChange(event: any) {
    const checked = event.checked;
    if (checked) {
      this.selectedDirecBoard = this.directorBoardsMemebers
      this.selectAll = true;
      console.log(this.selectedDirecBoard)
    } else {
      this.selectedDirecBoard=[]
      this.selectedbeneficiaries = [];
      this.selectedEmployees = []
      console.log(this.selectedDirecBoard)
      this.selectAll = false;
    }
  }
  onFilterChange(): void {
    this.getEmployees();
  }
  onBeneficiaryFilterChange() {
    this.getBeneficiaries()
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
  pushSelectedDirectorBoard() {
    console.log("employyyyyyyyy")
    this.BeneficiaryeDirectBoardMembers().reset();
    this.selectedDirecBoard.forEach((member) => {
      this.BeneficiaryeDirectBoardMembers().push(this.fb.group({
        id: [member.id],
        name: [member.name],
        ID_number: [member.ID_number],
        address: [member.address],
        gender: [member.gender],
        birth_date: [member.birth_date],
        mobile: [member.mobile],
        email: [member.email],
        image: [member.image],
        joining_date: [member.joining_date],
        membership_type: [member.membership_type],
        employer: [member.employer],
        is_founding_member: [member.is_founding_member],
        is_board_directores_member: [member.is_board_directores_member],
        educational_level: [member.educational_level],
        joining_way: [member.joining_date],
        job: [member.job],
        job_description: [member.job_description],
        insurance_number: [member.insurance_number],
        salary_support: [member.salary_support],
      }));
    });

  }
  closeModal() {
    this.visible = false
  }
  closeRepeateModal() {
    this.visible2 = false
    console.log(this.visible2)
  }
  openDialog() {
    this.visible = true
  }
  backRoute() {
    this.location.back()
  }
  onCheckRepeate(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      // Open dialog or execute your function
      console.log('Checkbox checked! Opening dialog...');
      this.visible2 = true;
    } else {
      console.log('Checkbox unchecked!');
    }
  }
  addIndicator() {
    if (this.addIndicatorForm.valid) {
      this.indicatorServices.addIndicator(this.addIndicatorForm.value).subscribe({
        next: (data) => {
          console.log(data)
          this.addIndicatorForm.reset({
            title: '',
            description: '',
            association_id: this.associationId
          });
          this.getIndicators()
          this.addIndicatorVisible = false

        },
        error: (error) => {
          console.log(error)
        }
      })
    }
    else {
      // this.messageService.add({ severity: 'error', summary: '', detail: 'تاكد من البيانات المرسلة  ' });
    }
  }
  addActivity() {
    this.activityService.addActivity(this.addActivityForm.value).subscribe({
      next: (data) => {
        console.log(data)
        this.addActivityForm.reset({
          name: '',
          description: '',
          association_id: this.associationId
        });
        this.getActivities()
        this.addActivityVisible = false

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  addExpected_impact() {
    this.expectedImpactService.addExpected_impact(this.addExpected_impactForm.value).subscribe({
      next: (data) => {
        console.log(data)
        this.addExpected_impactForm.reset({
          title: '',
          description: '',
          association_id: this.associationId
        });
        this.getExpectedImpacts()
        this.addExpected_impactVisible = false
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
