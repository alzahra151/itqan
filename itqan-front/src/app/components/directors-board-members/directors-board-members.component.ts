import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DirectorsBoardMembers } from '../../core/models/directors-board-members';
import { DirectorsBoardMembersService } from '../../core/services/directors_board_members/directors-board-members.service';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { EnumUtils } from '../../core/utils/enum-utils';
import { MembershipType } from '../../core/models/membership-type';
import { Gender } from '../../core/models/gender';
import { FoundingMember } from '../../core/models/founding-member';
import { EducationalLevel } from '../../core/models/educational-level';
import { JoiningWay } from '../../core/models/joining-way';
import { Job } from '../../core/models/job';
import { SalarySupport } from '../../core/models/salary-support';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-directors-board-members',
  standalone: true,
  imports: [AccordionModule,
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
  templateUrl: './directors-board-members.component.html',
  styleUrl: './directors-board-members.component.scss'
})
export class DirectorsBoardMembersComponent {
  directorsBoardForm!: FormGroup;
  selectedFile!: File;
  directorsBoardMembers: DirectorsBoardMembers[] = [];
  updatedDirectorsBoardMemberData!: DirectorsBoardMembers;
  associationId = localStorage.getItem('associationId') || '';
  photoSrc = ''
  submitted = false;
  membership_type: { key: string, value: string }[];
  gender: { key: string, value: string }[];
  is_founding_member: { key: string, value: string }[];
  educational_level: { key: string, value: string }[];
  joining_way: { key: string, value: string }[];
  job: { key: string, value: string }[];
  salary_support: { key: string, value: string }[];
  accordioneIndex: number | null = null;
  updatedMood: boolean = false
  deletedId: number = 0
  attachmentFiles: File[] = [];
  Options = [
    { key: 'نعم', value: true },
    { key: 'لا', value: false }
  ];
  constructor(
    private fb: FormBuilder,
    private DirectorsBoardService: DirectorsBoardMembersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.initializeForm();
    this.membership_type = EnumUtils.getEnumValues(MembershipType);
    this.gender = EnumUtils.getEnumValues(Gender);
    this.is_founding_member = EnumUtils.getEnumValues(FoundingMember);
    this.educational_level = EnumUtils.getEnumValues(EducationalLevel);
    this.joining_way = EnumUtils.getEnumValues(JoiningWay);
    this.job = EnumUtils.getEnumValues(Job);
    this.salary_support = EnumUtils.getEnumValues(SalarySupport);

  }

  ngOnInit(): void {
    this.fetchInitialData();
    if (isPlatformBrowser(this.platformId)) initFlowbite();
  }

  initializeForm() {
    this.directorsBoardForm = this.fb.group({
      name: ['', Validators.required],
      ID_number: ['', Validators.required],
      address: [''],
      gender: ['', Validators.required],
      birth_date: ['', Validators.required],
      mobile: ['', Validators.required],
      email: [''],
      image: [''],
      joining_date: ['', Validators.required],
      membership_type: ['', Validators.required],
      employer: [''],
      is_founding_member: [false],
      is_board_directores_member: [true],
      educational_level: [''],
      joining_way: [''],
      job: [''],
      job_description: [''],
      insurance_number: [''],
      salary_support: [false],
      // association_id: [null, Validators.required]
    });
  }

  fetchInitialData() {
    this.getDirectorsBoardMembers();

  }

  addOrUpdateDirectorsBoardMember() {
    this.submitted = true
    if (this.directorsBoardForm.valid) {
      const directorsBoardMemberData = this.buildFormData();
      console.log(this.updatedDirectorsBoardMemberData)
      console.log(this.updatedMood)
      const serviceCall = this.updatedMood
        ?
        this.DirectorsBoardService.updateDirectorsBoardMember(this.updatedDirectorsBoardMemberData.id, directorsBoardMemberData)
        : this.DirectorsBoardService.addDirectorsBoardMember(directorsBoardMemberData);

      serviceCall.subscribe({
        next: () => {
          this.submitted = false
          this.directorsBoardForm.reset();
          this.getDirectorsBoardMembers();
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
    const directorsBoardMemberData = new FormData();
    Object.keys(this.directorsBoardForm.controls).forEach(control => {
      directorsBoardMemberData.append(control, this.directorsBoardForm.get(control)?.value);
    });
    // if (!this.selectedFile) directorsBoardMemberData.append('image', '');
    directorsBoardMemberData.append('association_id', this.associationId);
    this.attachmentFiles.forEach((file, index) => {
      directorsBoardMemberData.append(`attachments`, file); // Cloudinary will handle array format for multiple files
    });
    console.log(directorsBoardMemberData)
    return directorsBoardMemberData;
  }
  getDirectorsBoardMembers() {
    this.DirectorsBoardService.getDirectorsBoardMembers(JSON.parse(this.associationId)).subscribe({
      next: (data) => {
        this.directorsBoardMembers = data.result.Directors_board_members,
          console.log(data)
      },
      error: (error) => this.messageService.add({ severity: 'error', detail: error.message })
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
      this.directorsBoardForm.get('image')?.patchValue(this.selectedFile);
      console.log(this.directorsBoardForm.get('image')?.value)
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
  async getUdatedDirectorsBoardMember(directorsBoardMembers: DirectorsBoardMembers) {
    this.buildFormData();
    console.log(directorsBoardMembers)
    this.directorsBoardForm.patchValue(directorsBoardMembers)
    if (directorsBoardMembers.image) {
      this.photoSrc = directorsBoardMembers.image; // Assuming image is a base64 or URL string
    } else {
      this.photoSrc = '../../../assets/imags/profile.jpg'; // Default image if none is set
    }
    this.updatedDirectorsBoardMemberData = directorsBoardMembers
    this.updatedMood = true
    this.accordioneIndex = null;
    this.cdr.detectChanges(); // Trigger change detection

    // Now set the accordion index to open it
    this.accordioneIndex = 0;
    console.log(this.accordioneIndex);
    this.cdr.detectChanges(); // Trigger change detection again
    console.log(this.directorsBoardForm.value)
  }
  confirmDeleteDirectorsBoardMember(event: Event, id: number) {
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
    this.DirectorsBoardService.deleteDirectorsBoardMember(id).subscribe({
      next: (data) => {
        this.messageService.add({ severity: 'success', summary: '', detail: 'تم الحذف' });
        this.getDirectorsBoardMembers()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
