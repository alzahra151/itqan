import { Component, inject } from '@angular/core';
import { IndicatorService } from '../../core/services/indicator/indicator.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Indicator } from '../../core/models/indicator';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AccordionModule } from 'primeng/accordion';
// import { title } from 'process';


@Component({
  selector: 'app-add-indicator',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule, AccordionModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './add-indicator.component.html',
  styleUrl: './add-indicator.component.scss'
})
export class AddIndicatorComponent {
  indicatorServices = inject(IndicatorService)
  confirmationService = inject(ConfirmationService)
  messageService = inject(MessageService)
  associationId = localStorage.getItem('associationId') || ''
  indicators: Indicator[] = []
  addIndicatorForm: FormGroup
  deletedId: number = 0
  updatedService!: Indicator
  updatedMood: boolean = false
  accordioneIndex: number | null = null;
  constructor(private fb: FormBuilder) {
    this.addIndicatorForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      association_id: [this.associationId, Validators.required]
    })
  }
  ngOnInit(): void {
    this.getServices()
  }
  getServices() {
    this.indicatorServices.getIndicatories(JSON.parse(this.associationId)).subscribe({
      next: (response) => {
        this.indicators = response.result.indicatories
        console.log(this.indicators)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  addservice() {
    if (this.addIndicatorForm.valid) {
      this.indicatorServices.addIndicator(this.addIndicatorForm.value).subscribe({
        next: (data) => {
          console.log(data)
          this.addIndicatorForm.reset({
            title: '',
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
  getUdatedService(service: Indicator) {
    this.addIndicatorForm.patchValue(service)
    this.updatedService = service
    this.updatedMood = true
  }
  updateService() {
    this.indicatorServices.updateIndicator(this.updatedService.id, this.addIndicatorForm.value).subscribe({
      next: (data) => {
        console.log(data)
        this.addIndicatorForm.reset({
          title: '',
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
    this.indicatorServices.deleteIndicator(id).subscribe({
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
