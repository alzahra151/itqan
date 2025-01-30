import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Supporter } from '../../core/models/supporter';
import { SupporterService } from '../../core/services/supporter/supporter.service';
import { EnumUtils } from '../../core/utils/enum-utils';
import { DonatePeriodically } from '../../core/models/donate-periodically';
import { RepeatDonation } from '../../core/models/repeat-donation';

@Component({
  selector: 'app-supporters',
  standalone: true,
  imports: [
    AccordionModule,
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
    CalendarModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ],
  templateUrl: './supporters.component.html',
  styleUrl: './supporters.component.scss'
})
export class SupportersComponent {
  supporterForm!: FormGroup;
  selectedFile!: File;
  supporters: Supporter[] = [];
  updatedsupporterData!: Supporter;
  associationId = localStorage.getItem('associationId') || '';
  photoSrc = ''
  submitted = false;
  accordioneIndex: number | null = null;
  updatedMood: boolean = false
  deletedId: number = 0
  donate_periodically: { key: string, value: string }[];
  repeat_donation: { key: string, value: string }[];
  attachmentFiles: File[] = [];
  donatePeriodicallyOptions = [
    { key: 'نعم', value: true },
    { key: 'لا', value: false }
  ];
  constructor(
    private fb: FormBuilder,
    private supporterService: SupporterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.initializeForm();
    this.donate_periodically = EnumUtils.getEnumValues(DonatePeriodically);
    this.repeat_donation = EnumUtils.getEnumValues(RepeatDonation);

  }

  ngOnInit(): void {
    this.fetchInitialData();
    if (isPlatformBrowser(this.platformId)) initFlowbite();
  }

  initializeForm() {
    this.supporterForm = this.fb.group({
      name: ['', Validators.required],
      ID_number: ['', Validators.required],
      mobile: ['', Validators.required],
      email: [''],
      image: [''],
      entity_name: ['', Validators.required],
      city: ['', Validators.required],
      donation_type: ['', Validators.required],
      donation_way: ['', Validators.required],
      donate_periodically: [false, Validators.required],
      repeat_donation: ['', Validators.required],
      end_date: [null, Validators.required],
    });
  }

  fetchInitialData() {
    this.getSupporters();

  }

  addOrUpdateEmployee() {
    this.submitted = true
    if (this.supporterForm.valid) {
      const directorsBoardMemberData = this.buildFormData();
      console.log(this.updatedsupporterData)
      console.log(this.updatedMood)
      const serviceCall = this.updatedMood
        ?
        this.supporterService.updateSupporter(this.updatedsupporterData.id, directorsBoardMemberData)
        : this.supporterService.addSupporter(directorsBoardMemberData);

      serviceCall.subscribe({
        next: () => {
          this.submitted = false
          this.supporterForm.reset();
          this.getSupporters();
          this.updatedMood = false
          this.messageService.add({ severity: 'success', summary: '', detail: 'Operation successful' });
          this.accordioneIndex = null;
          this.cdr.detectChanges(); // Trigger change detection
          // Now set the accordion index to open it
          this.accordioneIndex = 0;
          console.log(this.accordioneIndex);
          this.cdr.detectChanges(); // Trigger change detection again

          this.attachmentFiles = []
        },
        error: (error) => this.messageService.add({ severity: 'error', detail: error.message })
      });
    }
  }

  buildFormData(): FormData {
    const employeeData = new FormData();
    Object.keys(this.supporterForm.controls).forEach(control => {
      employeeData.append(control, this.supporterForm.get(control)?.value);
    });
    // if (!this.selectedFile) employeeData.append('image', );
    employeeData.append('association_id', this.associationId);
    this.attachmentFiles.forEach((file, index) => {
      employeeData.append(`attachments`, file); // Cloudinary will handle array format for multiple files
      console.log(file)
    });
    console.log(employeeData)
    return employeeData;
  }
  getSupporters() {
    this.supporterService.getSupporters(JSON.parse(this.associationId)).subscribe({
      next: (data) => {
        this.supporters = data.result.supporters,
          console.log(data)
        this.accordioneIndex = 1
      },
      error: (error) => this.messageService.add({ severity: 'error', detail: error.message })
    });

  }
  onSelectImage(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.photoSrc = reader.result as string;
      });
      reader.readAsDataURL(this.selectedFile);
      this.supporterForm.get('image')?.patchValue(this.selectedFile);
      console.log(this.supporterForm.get('image')?.value)
    }
  }
  onFileSelect(event: any) {
    // const target = event.target as HTMLInputElement;
    // this.attachmentFiles = Array.from(event.target.files); // Multiple attachments
    Array.from(event.target.files).forEach((file: any) => {
      this.attachmentFiles.push(file)
    })
    console.log(this.attachmentFiles)
  }
  deleteAttachmentFile(index: any) {
    this.attachmentFiles.splice(index, 1)
  }
  async getUdatedDirectorsBoardMember(directorsBoardMembers: Supporter) {
    this.buildFormData();
    console.log(directorsBoardMembers)
    this.supporterForm.patchValue(directorsBoardMembers)
    if (directorsBoardMembers.image) {
      this.photoSrc = directorsBoardMembers.image; // Assuming image is a base64 or URL string
    } else {
      this.photoSrc = '../../../assets/imags/profile.jpg'; // Default image if none is set
    }
    // this.attachmentFiles = JSON.parse(directorsBoardMembers.attachments)
    // Array.from(JSON.parse(directorsBoardMembers.attachments)).forEach((file: any) => {
    //   this.attachmentFiles.push(file)
    // })
    console.log(this.attachmentFiles)
    this.updatedsupporterData = directorsBoardMembers
    this.updatedMood = true
    this.accordioneIndex = null;
    this.cdr.detectChanges(); // Trigger change detection

    // Now set the accordion index to open it
    this.accordioneIndex = 0;
    console.log(this.accordioneIndex);
    this.cdr.detectChanges(); // Trigger change detection again
    console.log(this.supporterForm.value)
  }
  confirmDeleteEmployee(event: Event, id: number) {
    this.deletedId = id
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
        this.deleteDirectorsBoardMember(id)
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: '', detail: 'تم الغاء الحذف' });
      }
    });
  }
  deleteDirectorsBoardMember(id: number) {
    this.supporterService.deleteSupporter(id).subscribe({
      next: (data) => {
        this.messageService.add({ severity: 'success', summary: '', detail: 'تم الحذف' });
        this.getSupporters()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
