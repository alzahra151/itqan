import {
  ChangeDetectorRef,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { EmployeeService } from '../../core/services/employee/employee.service';
import { AdministrationService } from '../../core/services/administration/administration.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Employee } from '../../core/models/employee';
import { RoleService } from '../../core/services/role/role.service';
import { IRole } from '../../core/models/role';
import { Department } from '../../core/models/department';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { initFlowbite } from 'flowbite';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { EnumUtils } from '../../core/utils/enum-utils';
import { Gender } from '../../core/models/gender';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    DropdownModule,
    TableModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule,
    CheckboxModule,
    CalendarModule,
    AccordionModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent {
  products = [{ code: 1, name: 'test', category: 'test', quantatity: 2 }];
  selectedFile!: File;
  photoSrc = '';
  employeeForm: FormGroup;
  employees: Employee[] = [];
  departments: Department[] = [];
  value: string | undefined;
  message: any;
  roles: IRole[] = [];
  updatedEmployee!: Employee;
  updatedMood: boolean = false;
  deletedId: number = 0;
  accordioneIndex: number | null = null;
  activeOnSystem: boolean = true;
  submitted = false;
  gender: { key: string; value: string }[];
  associationId = localStorage.getItem('associationId') || '';
  age!: number;
  filters = {
    name: '',
    email: '',
    minAge: '',
    maxAge: '',
  };

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private adminstrationService: AdministrationService,
    private roleService: RoleService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.employeeForm = this.fb.group(
      {
        name: ['', Validators.required],
        job_number: [, Validators.required],
        ID_number: [, Validators.required],
        address: [''],
        gender: ['', Validators.required],
        birth_date: [, Validators.required],
        mobile: ['', Validators.required],
        active_on_system: [true, Validators.required],
        password: [''],
        confirmPassword: [''],
        image: [null],
        department_id: [, Validators.required],
        role_id: [, Validators.required],
        email: [''],
        user_name: [''],
      },
      { validator: this.passwordMatchValidator }
    );
    this.gender = EnumUtils.getEnumValues(Gender);
  }

  ngOnInit(): void {
    this.getEmployess();
    this.getDeparments();
    this.getRole();
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
    console.log(this.associationId);
  }
  get active_on_system() {
    return this.employeeForm.get('active_on_system');
  }
  addEmployee() {
    this.submitted = true;
    if (this.employeeForm.valid) {
      const employeeData = new FormData();
      employeeData.append('name', this.employeeForm.get('name')?.value);
      employeeData.append(
        'job_number',
        this.employeeForm.get('job_number')?.value
      );
      employeeData.append('mobile', this.employeeForm.get('mobile')?.value);
      employeeData.append(
        'ID_number',
        this.employeeForm.get('ID_number')?.value
      );
      employeeData.append('address', this.employeeForm.get('address')?.value);
      employeeData.append('gender', this.employeeForm.get('gender')?.value);
      employeeData.append('password', this.employeeForm.get('password')?.value);
      employeeData.append(
        'department_id',
        this.employeeForm.get('department_id')?.value
      );
      employeeData.append(
        'birth_date',
        this.employeeForm.get('birth_date')?.value
      );
      employeeData.append('email', this.employeeForm.get('email')?.value);
      employeeData.append(
        'user_name',
        this.employeeForm.get('user_name')?.value
      );
      employeeData.append(
        'active_on_system',
        this.employeeForm.get('active_on_system')?.value
      );
      employeeData.append('image', this.selectedFile);
      employeeData.append('association_id', this.associationId);
      employeeData.append('role_id', this.employeeForm.get('role_id')?.value);

      this.employeeService.addEmployee(employeeData).subscribe({
        next: (data) => {
          console.log(data);
          this.getEmployess();
          this.employeeForm.reset();
          this.submitted = false;
          this.accordioneIndex = -1;
          setTimeout(() => {
            this.accordioneIndex = null;
            this.cdr.detectChanges();
          }, 50);
          console.log(this.accordioneIndex)
        },
        error: (error) => {
          console.log(error);
          this.message = error.error.message;
          console.log(this.message);
        },
      });
    } else {
      // Display validation errors
      console.log('Form is invalid');
    }
  }
  getDeparments() {
    this.adminstrationService
      .getDeparments(JSON.parse(this.associationId))
      .subscribe({
        next: (data) => {
          this.departments = data.result.departments;
          console.log(this.departments);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  setFileData(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.photoSrc = reader.result as string;
      });
      reader.readAsDataURL(this.selectedFile);
      this.employeeForm.get('image')?.patchValue(this.selectedFile);
      console.log(this.employeeForm.get('image')?.value);
    }
  }
  getEmployess() {
    this.employeeService
      .getEmployees(this.filters, JSON.parse(this.associationId))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.employees = data.result.employees;
          this.employees.forEach((employee) => {
            if (employee.birth_date) {
              employee.age = this.calculateAge(employee.birth_date);
            }
          });
        },
        error: (error) => {
          console.log(error);
          this.message = error.error.message;
          console.log(this.message);
        },
      });
  }
  getRole() {
    this.roleService.getRoles().subscribe({
      next: (data) => {
        this.roles = data.result.roles;
        console.log(this.roles);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getUdatedEmplyee(employee: Employee) {
    console.log(employee);
    this.employeeForm.patchValue(employee);
    this.updatedEmployee = employee;
    this.updatedMood = true;
    this.accordioneIndex = null;
    this.cdr.detectChanges(); // Trigger change detection
    // Now set the accordion index to open it
    this.accordioneIndex = 0;
    console.log(this.accordioneIndex);
    this.cdr.detectChanges(); // Trigger change detection again
  }
  updateEmplyee() {
    const updateEmployeeData = new FormData();
    updateEmployeeData.append('name', this.employeeForm.get('name')?.value);
    updateEmployeeData.append(
      'job_number',
      this.employeeForm.get('job_number')?.value
    );
    updateEmployeeData.append('mobile', this.employeeForm.get('mobile')?.value);
    updateEmployeeData.append(
      'ID_number',
      this.employeeForm.get('ID_number')?.value
    );
    updateEmployeeData.append(
      'address',
      this.employeeForm.get('address')?.value
    );
    updateEmployeeData.append('gender', this.employeeForm.get('gender')?.value);
    updateEmployeeData.append(
      'department_id',
      this.employeeForm.get('department_id')?.value
    );
    updateEmployeeData.append(
      'birth_date',
      this.employeeForm.get('birth_date')?.value
    );
    updateEmployeeData.append('email', this.employeeForm.get('email')?.value);
    updateEmployeeData.append(
      'user_name',
      this.employeeForm.get('user_name')?.value
    );
    updateEmployeeData.append(
      'active_on_system',
      this.employeeForm.get('active_on_system')?.value
    );
    updateEmployeeData.append('image', this.selectedFile);
    updateEmployeeData.append('association_id', this.associationId);
    updateEmployeeData.append(
      'role_id',
      this.employeeForm.get('role_id')?.value
    );
    this.employeeService
      .updateEmployee(this.updatedEmployee.id, updateEmployeeData)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.employeeForm.reset();
          this.getEmployess();
          this.updatedMood = false;
          this.accordioneIndex = -1;
          setTimeout(() => {
            this.accordioneIndex = null;
            this.cdr.detectChanges();
          }, 50);

          console.log(this.accordioneIndex)
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  confirmDeleteEmployee(event: Event, id: number) {
    this.deletedId = id;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'هل انت متاكد من انك تريد حذف العنصر',
      header: 'تاكيد الحذف',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.deleteEmployee(id);
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: '',
          detail: 'تم الغاء الحذف',
        });
      },
    });
  }
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: '',
          detail: 'تم الحذف',
        });
        this.getEmployess();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }
  calculateAge(birthdate: Date) {
    console.log('birth date 0', birthdate);
    const birthDate = new Date(birthdate); // Convert the birthdate string to a Date object
    console.log('birth date 1', birthDate);
    const today = new Date(); // Get today's date
    let age = today.getFullYear() - birthDate.getFullYear(); // Calculate the difference in years
    return age;
  }
}
