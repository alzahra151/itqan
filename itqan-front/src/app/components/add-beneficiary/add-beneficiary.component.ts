import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { EnumUtils } from '../../core/utils/enum-utils';
import { Gender } from '../../core/models/gender';
import { Kinship } from '../../core/models/kinship';
import { MaritalStatus } from '../../core/models/marital-status';
import { IdentityType } from '../../core/models/identity-type';
import { ServiceService } from '../../core/services/service/service.service';
import { Service } from '../../core/models/service';
import { BenficieryType } from '../../core/models/benficiery-type';
import { BeneficiaryService } from '../../core/services/beneficiary/beneficiary.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessagesModule } from 'primeng/messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-beneficiary',
  standalone: true,
  imports: [FileUploadModule, ToastModule,
    CommonModule,
    DropdownModule,
    CalendarModule,
    RadioButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
    ProgressBarModule,
    MessagesModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './add-beneficiary.component.html',
  styleUrl: './add-beneficiary.component.scss'
})
export class AddBeneficiaryComponent implements OnInit {
  fb = inject(FormBuilder)
  serviceService = inject(ServiceService)
  beneficiaryService = inject(BeneficiaryService)
  illnessSelectedFiles: any[] = [];
  contactSelectedFiles: any[] = [];
  certificateSelectedFiles: any[] = [];
  selectedImage!: File
  photoSrc = ''
  beneficiaryForm: FormGroup
  weekDays: string[] = ['السبت', 'الاحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعة'];
  contactsList: any[] = []
  servicesList: Service[] = []
  gender: { key: string, value: string }[];
  Kinship: { key: string, value: string }[];
  maritalStatus: { key: string, value: string }[];
  identityType: { key: string, value: string }[];
  type: { key: string, value: string }[];
  showProgress: Boolean = false
  attachmentData = new FormData()
  associationId = localStorage.getItem('associationId') || ''
  router = inject(Router)
  submitted = false;
  age:number=0
  constructor(private messageService: MessageService) {
    this.beneficiaryForm = this.fb.group({
      name: ['', Validators.required],
      record_history: [, Validators.required],
      file_no: [],
      gender: ['', Validators.required],
      type: ['', Validators.required],
      birth_date: [, Validators.required],
      nationality: ['', Validators.required],
      identity: this.fb.group({
        type: ['', Validators.required],
        value: ['', Validators.required]
      }),
      marital_status: ['', Validators.required],
      educational_level: ['', Validators.required],
      scientific_certificates: [''],
      job: ['', Validators.required],
      employer: [''],
      monthly_income_from: [, Validators.required],
      monthly_income_to: [, Validators.required],
      housing_type: ['', Validators.required],
      mobility_status: [''],
      email: [''],
      home_address: ['', Validators.required],
      work_address: [''],
      colse_person: this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        mobile: ['', Validators.required],
      }),
      Image: [''],
      age: [],
      illnesses: this.fb.group({
        name: ['', Validators.required],
        injury_history: [, Validators.required],
        illness_nature: [''],
        latest_diagnosis: [''],
      }),
      dependents: this.fb.array([this.dependent]),
      services: this.fb.array([this.service]),
      home_number: this.contactNumbers('home'),
      work_number: this.contactNumbers('work'),
      phone_number: this.contactNumbers('phone'),
      whatsApp_number: this.contactNumbers('whatsApp'),
      association_id: [this.associationId]
    })
    //enums
    this.gender = EnumUtils.getEnumValues(Gender);
    this.Kinship = EnumUtils.getEnumValues(Kinship)
    this.maritalStatus = EnumUtils.getEnumValues(MaritalStatus)
    this.identityType = EnumUtils.getEnumValues(IdentityType)
    this.type = EnumUtils.getEnumValues(BenficieryType)
  }
  ngOnInit(): void {
    this.getservices()
  }
  getAttachmentNames() {
    const attachments = this.beneficiaryForm.get('illnesses.attachments') as FormGroup;
    const namesArray = attachments.get('name');
    return namesArray?.value;
  }
  get dependent(): FormGroup {
    return this.fb.group({
      kinship: [''],
      numbers: [null]
    });
  }
  get DependetList() {
    return this.beneficiaryForm.get('dependents') as FormArray;
  }
  addDependent() {
    this.DependetList.push(this.dependent)
  }
  get service() {
    return this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      repeat_days: this.fb.array([]),
      service_id: [, Validators.required]
    });
  }
  get services(): FormArray {
    return this.beneficiaryForm.get('services') as FormArray;
  }
  addService() {
    this.services.push(this.service)
  }
  deleteService(index: number) {
    this.services.removeAt(index);
  }
  contactNumbers(type: string) {
      const isRequired = ['phone', 'whatsApp'].includes(type);
    return this.fb.group({
      number: ['', isRequired ? Validators.required : []],
      type: [type]
    })
  }

  onIlnessFileSelected(event: any) {
    Array.from(event.target.files).forEach((file) => {
      this.illnessSelectedFiles.push(file)
    })
    console.log(this.illnessSelectedFiles)
    for (let file of this.illnessSelectedFiles) {
      this.attachmentData.append('illness_attachment', file)
    }
    this.attachmentData.forEach(illness_attachment => {
      console.log(illness_attachment)
    })
  }
  onContactFileSelected(event: any) {
    Array.from(event.target.files).forEach((file) => {
      this.contactSelectedFiles.push(file)
    })
    console.log(this.contactSelectedFiles)
    for (let file of this.contactSelectedFiles) {
      this.attachmentData.append('contact_attachment', file)
    }
    this.attachmentData.forEach(contact_attachment => {
      console.log(contact_attachment)
    })

  }
  onCertificateFileSelected(event: any) {
    Array.from(event.target.files).forEach((file) => {
      this.certificateSelectedFiles.push(file)
    })
    console.log(this.certificateSelectedFiles)
    for (let file of this.certificateSelectedFiles) {
      this.attachmentData.append('certificate_attachment', file)
    }
    for (var [key, val] of this.attachmentData.entries()) {
      console.log(key, val);
    }
  }
  OnselectedImage(event: any) {
    if (event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.photoSrc = reader.result as string;
      });
      reader.readAsDataURL(this.selectedImage);
      this.attachmentData.append('image', this.selectedImage)
    }
  }
  deleteIllnessFile(index: any) {
    this.illnessSelectedFiles.splice(index, 1)
  }
  deleteCertificateFile(index: any) {
    this.certificateSelectedFiles.splice(index, 1)
  }
  deleteContactFile(index: any) {
    this.contactSelectedFiles.splice(index, 1)
  }
  getSelectedDays(event: any, serviceIndex: number) {
    const repeatDays = this.services.at(serviceIndex).get('repeat_days') as FormArray;
    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      repeatDays.push(new FormControl(event.target.value));
    }
    else {
      // find the unselected element
      let i: number = 0;
      repeatDays.controls.forEach((ctrl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          repeatDays.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  getservices() {
    this.serviceService.getServices(JSON.parse(this.associationId)).subscribe({
      next: (services) => {
        this.servicesList = services.result?.services
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  onsubmit() {
    this.submitted = true
    if (this.beneficiaryForm.valid) {
      if (
        this.illnessSelectedFiles.length > 0 ||
        this.contactSelectedFiles.length > 0 ||
        this.certificateSelectedFiles.length > 0 ||
        this.selectedImage
      ) {
        this.showProgress = true
        this.beneficiaryService.addBeneficiaryWithAttachments(this.beneficiaryForm.value, this.attachmentData).subscribe({
          next: (respone) => {
            console.log(respone)
            this.illnessSelectedFiles = [];
            this.contactSelectedFiles = [];
            this.certificateSelectedFiles = [];
            this.showProgress = false
            this.submitted = false
            this.messageService.add({ severity: 'success', summary: 'تمت الاضافة بنجاح ', detail: '' })
            this.router.navigate(['home/beneficaries'])
          },
          error: (error) => {
            console.log(error)
            this.showProgress = false
          }
        })
      } else {
        this.beneficiaryService.addBeneficiary(this.beneficiaryForm.value).subscribe({
          next: (response) => {
            console.log(response)
            this.messageService.add({ severity: 'success', summary: 'تمت الاضافة بنجاح ', detail: '' });
            this.router.navigate(['home/beneficaries'])
          },
          error: (error) => {
            console.log(error)
          }
        })
      }
    } else {
      console.log('invalid')
    }
  }

  calculateAge(birthdate: Date) {
    // console.log(birthdate)
  // const birthDate = new Date(birthdate); // Convert the birthdate string to a Date object
    const today = new Date(); // Get today's date
  
    this.age = today.getFullYear() - birthdate.getFullYear(); // Calculate the difference in years

  }
    onBirthDateSelect(event: any): void {
    const birthDate = event; // Date object from p-calendar selection
    this.calculateAge(birthDate);
  }

}
