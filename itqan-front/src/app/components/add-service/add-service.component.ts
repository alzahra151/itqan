import { Component, OnInit, inject } from '@angular/core';
import { ServiceService } from '../../core/services/service/service.service';
import { Service } from '../../core/models/service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    AccordionModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.scss'
})
export class AddServiceComponent implements OnInit {
  serviceServices = inject(ServiceService)
  confirmationService = inject(ConfirmationService)
  messageService = inject(MessageService)
  associationId = localStorage.getItem('associationId') || ''
  services: Service[] = []
  addSrviceForm: FormGroup
  deletedId: number = 0
  updatedService!: Service
  updatedMood: boolean = false
  accordioneIndex: number | null = null;
  constructor(private fb: FormBuilder,) {
    this.addSrviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      association_id: [this.associationId, Validators.required]
    })
  }
  ngOnInit(): void {
    this.getServices()
  }
  getServices() {
    this.serviceServices.getServices(JSON.parse(this.associationId)).subscribe({
      next: (response) => {
        this.services = response.result.services
        console.log(this.services)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  addservice() {
    if (this.addSrviceForm.valid) {
      this.serviceServices.addService(this.addSrviceForm.value).subscribe({
        next: (data) => {
          console.log(data)
          this.addSrviceForm.reset({
            name: '',
            description: '',
            association_id: this.associationId
          });
          this.getServices()
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
    else {
      this.messageService.add({ severity: 'error', summary: '', detail: 'تاكد من البيانات المرسلة  ' });
    }
  }
  getUdatedService(service: Service) {
    this.addSrviceForm.patchValue(service)
    this.updatedService = service
    this.updatedMood = true
  }
  updateService() {
    this.serviceServices.updateService(this.updatedService.id, this.addSrviceForm.value).subscribe({
      next: (data) => {
        console.log(data)
        this.addSrviceForm.reset({
          name: '',
          description: '',
          association_id: this.associationId
        });
        this.getServices()
        this.updatedMood = false
      },
      error: (error) => {
        console.log(error)
        this.updatedMood = false
      }
    })
  }
  confirmDeleteService(event: Event, id: number) {
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
        this.deleteEmployee(id)
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: '', detail: 'تم الغاء الحذف' });
      }
    });
  }
  deleteEmployee(id: number) {
    this.serviceServices.deleteService(id).subscribe({
      next: (data) => {
        this.messageService.add({ severity: 'success', summary: '', detail: 'تم الحذف' });
        this.getServices()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
