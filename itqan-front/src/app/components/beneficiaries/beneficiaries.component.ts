import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { BeneficiaryService } from '../../core/services/beneficiary/beneficiary.service';
import { Beneficiary } from '../../core/models/beneficiary';
import { ServiceService } from '../../core/services/service/service.service';
import { Service, serviceResponse } from '../../core/models/service';
import { CalendarModule } from 'primeng/calendar';
import { RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-beneficiaries',
  standalone: true,
  imports: [
    TableModule,
    FormsModule,
    DropdownModule,
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    RouterLink,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [ConfirmationService,
    MessageService],
  templateUrl: './beneficiaries.component.html',
  styleUrl: './beneficiaries.component.scss'
})
export class BeneficiariesComponent implements OnInit {
  constructor(private confirmationService: ConfirmationService,
    private messageService: MessageService,){}
  ngOnInit(): void {
    this.getBeneficiaries()
    this, this.getServices()
  }
  beneficaiaryService = inject(BeneficiaryService)
  serviceService = inject(ServiceService)
  associationId = localStorage.getItem('associationId') || ''
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
  deletedId: number = 0
  beneficiaries: Beneficiary[] = []
  services: Service[] = []
  loading: boolean = false
  getBeneficiaries() {
    this.loading = true
    this.beneficaiaryService.getBeneficiaries(this.beneficaryFilters, JSON.parse(this.associationId)).subscribe({
      next: (data) => {
        this.beneficiaries = data.result.beneficiaries
        console.log(this.beneficiaries)
        this.beneficiaries.forEach(beneficiary => {
          if (beneficiary.birth_date) {
            beneficiary.age = this.calculateAge(beneficiary.birth_date);
            console.log(beneficiary.age)
          }
        });
        this.loading = false
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
  onBeneficiaryFilterChange() {
    this.getBeneficiaries()
  }
  onServiceChange(event: any) {
    console.log(event.value)
    this.beneficaryFilters.serviceId = event.value
    this.getBeneficiaries();
  }
  calculateAge(birthdate: Date) {
    const birthDate = new Date(birthdate); // Convert the birthdate string to a Date object
    console.log("birthDate", birthDate)
    const today = new Date(); // Get today's date
    console.log(today.getFullYear())
    console.log(birthDate.getFullYear())
    let age = today.getFullYear() - birthDate.getFullYear(); // Calculate the difference in years

    return age
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
        this.deleteBeneficiary(id)
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: '', detail: 'تم الغاء الحذف' });
      }
    });
  }
  deleteBeneficiary(id: number) {
    this.beneficaiaryService.deleteBeneficiary(id).subscribe({
      next: (data) => {
        this.messageService.add({ severity: 'success', summary: '', detail: 'تم الحذف' });
        this.getBeneficiaries()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
