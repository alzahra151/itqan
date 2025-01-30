import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { EnumUtils } from '../../core/utils/enum-utils';
import { initFlowbite } from 'flowbite';
import { Volunteer } from '../../core/models/volunteer';
import { VolunteerService } from '../../core/services/volunteer/volunteer.service';
import { VolunteeringPlace } from '../../core/models/volunteering-place';
import { VolunteeringReadiness } from '../../core/models/volunteering-readiness';
import { VolunteeringType } from '../../core/models/volunteering-type';
import { VolunteeringNature } from '../../core/models/volunteering-nature';

@Component({
  selector: 'app-volunteers',
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
    CalendarModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './volunteers.component.html',
  styleUrl: './volunteers.component.scss',
})
export class VolunteersComponent {
  VolunteerForm!: FormGroup;
  selectedFile!: File;
  volunteers: Volunteer[] = [];
  updatedVolunteerData!: Volunteer;
  attachmentFiles: File[] = [];
  associationId = localStorage.getItem('associationId') || '';
  photoSrc = '';
  submitted = false;
  accordioneIndex: number | null = null;
  updatedMood: boolean = false;
  deletedId: number = 0;
  volunteering_place: { key: string; value: string }[];
  volunteering_readiness: { key: string; value: string }[];
  volunteering_type: { key: string; value: string }[];
  volunteering_nature: { key: string; value: string }[];
  constructor(
    private fb: FormBuilder,
    private VolunteerService: VolunteerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.initializeForm();
    this.volunteering_place = EnumUtils.getEnumValues(VolunteeringPlace);
    this.volunteering_readiness = EnumUtils.getEnumValues(VolunteeringReadiness);
    this.volunteering_type = EnumUtils.getEnumValues(VolunteeringType);
    this.volunteering_nature = EnumUtils.getEnumValues(VolunteeringNature);
  }

  ngOnInit(): void {
    this.fetchInitialData();
    if (isPlatformBrowser(this.platformId)) initFlowbite();
  }

  initializeForm() {
    this.VolunteerForm = this.fb.group({
      name: ['', Validators.required],
      ID_number: ['', Validators.required],
      mobile: ['', Validators.required], // Adjust pattern as needed
      email: ['', [Validators.required, Validators.email]],
      image: [''],
      volunteer_opportunity_name: ['', Validators.required],
      volunteering_type: ['', Validators.required],
      volunteering_nature: ['', Validators.required],
      volunteering_place: ['', Validators.required],
      volunteering_readiness: [false, Validators.required], // Assuming readiness is a boolean
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],
      // association_id: [null, [Validators.required, Validators.min(1)]], // Adjust validation if association_id must be positive
    });
  }

  fetchInitialData() {
    this.getVolunteers();
  }

  addOrUpdateVolunteer() {
    this.submitted = true;
    if (this.VolunteerForm.valid) {
      const directorsBoardMemberData = this.buildFormData();
      console.log(this.updatedVolunteerData);
      console.log(this.updatedMood);
      const serviceCall = this.updatedMood
        ? this.VolunteerService.updateVolunteer(
          this.updatedVolunteerData.id,
          directorsBoardMemberData
        )
        : this.VolunteerService.addVolunteer(directorsBoardMemberData);

      serviceCall.subscribe({
        next: () => {
          this.submitted = false;
          this.VolunteerForm.reset();
          this.getVolunteers();
          this.updatedMood = false;
          this.messageService.add({
            severity: 'success',
            summary: '',
            detail: 'Operation successful',
          });
          this.accordioneIndex = null;
          this.cdr.detectChanges(); // Trigger change detection
          // Now set the accordion index to open it
          // this.accordioneIndex = 0;
          // console.log(this.accordioneIndex);
          // this.cdr.detectChanges(); // Trigger change detection again

          this.attachmentFiles = []
        },
        error: (error) =>
          this.messageService.add({ severity: 'error', detail: error.message }),
      });
    }
  }

  buildFormData(): FormData {
    const volunteerData = new FormData();
    Object.keys(this.VolunteerForm.controls).forEach((control) => {
      volunteerData.append(control, this.VolunteerForm.get(control)?.value);
    });
    // if (!this.selectedFile) volunteerData.append('image', );
    volunteerData.append('association_id', this.associationId);
    this.attachmentFiles.forEach((file, index) => {
      volunteerData.append(`attachments`, file); // Cloudinary will handle array format for multiple files
    });
    console.log(volunteerData);
    return volunteerData;
  }
  getVolunteers() {
    this.VolunteerService.getVolunteers(
      JSON.parse(this.associationId)
    ).subscribe({
      next: (data) => {
        (this.volunteers = data.result.volunteers),
          console.log(this.volunteers);
        this.accordioneIndex = 1;
      },
      error: (error) =>
        this.messageService.add({ severity: 'error', detail: error.message }),
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
      this.VolunteerForm.get('image')?.patchValue(this.selectedFile);
      console.log(this.VolunteerForm.get('image')?.value);
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
  async getUdatedDirectorsBoardMember(directorsBoardMembers: Volunteer) {
    this.buildFormData();
    console.log(directorsBoardMembers);
    this.VolunteerForm.patchValue(directorsBoardMembers);
    if (directorsBoardMembers.image) {
      this.photoSrc = directorsBoardMembers.image; // Assuming image is a base64 or URL string
    } else {
      this.photoSrc = '../../../assets/imags/profile.jpg'; // Default image if none is set
    }
    this.updatedVolunteerData = directorsBoardMembers;
    this.updatedMood = true;
    this.accordioneIndex = null;
    this.cdr.detectChanges(); // Trigger change detection

    // Now set the accordion index to open it
    this.accordioneIndex = 0;
    console.log(this.accordioneIndex);
    this.cdr.detectChanges(); // Trigger change detection again
    console.log(this.VolunteerForm.value);
  }
  confirmDeleteVolunteer(event: Event, id: number) {
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
        this.deleteDirectorsBoardMember(id);
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
  deleteDirectorsBoardMember(id: number) {
    this.VolunteerService.deleteVolunteer(id).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: '',
          detail: 'تم الحذف',
        });
        this.getVolunteers();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
