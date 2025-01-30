import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { AdministrationService } from '../../core/services/administration/administration.service';
import { Administration } from '../../core/models/administration';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { delay } from 'rxjs';
import { LoaderService } from '../../core/services/loader/loader.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { Department } from '../../core/models/department';


@Component({
  selector: 'app-administrations',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    CommonModule
  ],
  providers: [
    AdministrationService,
    ConfirmationService,
    MessageService
  ],
  templateUrl: './administrations.component.html',
  styleUrl: './administrations.component.scss'
})
export class AdministrationsComponent implements OnInit {
  @ViewChild('modalElement') modalElement!: ElementRef;
  administrations!: any
  administrationForm: FormGroup
  departmentsForm: FormGroup
  deletedId: number = 0
  visible: boolean = false;
  visibleDepartmentEditForm = false
  visibleAdminstrationEditForm = false
  deparmentErrorMes: any
  updatedDeparment: any
  updatedAdminstration: Administration = {}
  associationId = localStorage.getItem('associationId') || ''
  constructor(private administrationService: AdministrationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private loaderService: LoaderService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.administrationForm = this.fb.group({
      name: ['', Validators.required],
      association_id: [this.associationId, Validators.required]
    })
    this.departmentsForm = this.fb.group({
      name: [, Validators.required],
      code: [],
      transfer_number: [],
      administration_id: [, Validators.required],
      association_id: [this.associationId, Validators.required]
    })
  }
  get nameDepartment() {
    return this.departmentsForm.get('name')
  }
  ngOnInit() {
    this.getAdministration()
    this.primengConfig.ripple = true;
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite()
    }
  }
  getAdministration() {
       this.loaderService.show()
    this.administrationService.getAdministrations(JSON.parse(this.associationId)).subscribe({
      next: (data: any) => {
        this.administrations = data
        console.log(this.administrations)
        this.loaderService.hide()
      },
      error: (error) => {
        console.log(error)
  this.loaderService.hide()
      }
    })
  }
  addAdministration() {
     this.loaderService.show()
    this.administrationService.addAdministration(this.administrationForm.value).subscribe({
      next: (data: any) => {
        console.log(data)
        this.getAdministration()
         this.loaderService.hide()
        this.visible = false;
          this.administrationForm.reset({ association_id: this.associationId });
      },
      error: (error) => {
        console.log(error.error.message)
         this.loaderService.hide()

      }
    })
  }
  addDeparment(administrationID: any) {
    this.loaderService.show()
    this.departmentsForm.get('administration_id')?.patchValue(administrationID)
    this.administrationService.addDepartment(this.departmentsForm.value).subscribe({
      next: (data: any) => {
        console.log(data)
        this.getAdministration()
        this.loaderService.hide()
          this.departmentsForm.reset({ association_id: this.associationId });
      },
      error: (error) => {
        console.log(error.error.message)
        this.messageService.add({ severity: 'error', summary: '', detail: error.error.message[0].message });
           this.loaderService.hide()
      }
    })
  }
  deleteDepartment(id: number) {
       this.loaderService.show()
    this.administrationService.deleteDeparment(id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.getAdministration()
        this.messageService.add({ severity: 'info', summary: '', detail: 'تم الحذف' });
           this.loaderService.hide()
      },
      error: (error) => {
        console.log(error.error.message)
        this.messageService.add({ severity: 'error', summary: '', detail: error.error.message });
 this.loaderService.hide()
      }
    })
  }
  deleteAdminstration(id: number) {
      this.loaderService.show()
    this.administrationService.deleteAdminstration(id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.getAdministration()
        this.messageService.add({ severity: 'info', summary: '', detail: 'تم الحذف' });
         this.loaderService.hide()
      },
      error: (error) => {
        console.log(error.error.message)
        this.messageService.add({ severity: 'error', summary: '', detail: error.error.message });
         this.loaderService.hide()

      }
    })
  }
  updateDepartment() {
    console.log(this.updatedDeparment.id)
    this.administrationService.updateDeparment(this.updatedDeparment.id, this.departmentsForm.value).subscribe({
      next: (data: any) => {
        console.log(data)
        this.getAdministration()
        this.visibleDepartmentEditForm = false;
      },
      error: (error) => {
        console.log(error.error.message)
      }
    })
  }
  showDialog() {
    this.visible = true;
  }
  showDepartmentEditDialog(id: number, administrationId: number) {
    this.departmentsForm.get('administration_id')?.patchValue(administrationId)
    this.visibleDepartmentEditForm = true;
    this.getDeparmentById(id)
  }
  confirmDeleteDeparment(event: Event, id: number) {
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
        this.deleteDepartment(id)
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: '', detail: 'تم الغاء الحذف' });
      }
    });
  }
  confirmdeletAdminstration(event: Event, id: number) {
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
        this.deleteAdminstration(id)
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: '', detail: 'تم الغاء الحذف' });
      }
    });
  }
  getDeparmentById(id: number) {
    this.administrationService.getdeparmentById(id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.updatedDeparment = data
        this.departmentsForm.patchValue({
          name: data.name,
          // association_id: this.associationId
        })
      },
      error: (error) => {
        console.log(error.error.message)
      }
    })
  }
  updateAdminstration() {
    console.log(this.administrationForm.value)
    this.administrationService.updateAdminstration(this.updatedAdminstration.id, this.administrationForm.value).subscribe({
      next: (data: any) => {
        console.log(data)
        this.getAdministration()
        this.visibleAdminstrationEditForm = false;
      },
      error: (error) => {
        console.log(error.error.message)
      }
    })
  }
  showAdminstrationEditDialog(adminstartion: Administration) {
    this.visibleAdminstrationEditForm = true;
    this.updatedAdminstration = adminstartion
    this.administrationForm.patchValue({
      name: adminstartion.name,
      // association_id: this.associationId
    })
  }
}
