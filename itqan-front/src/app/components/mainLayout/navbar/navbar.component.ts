import { Component, Inject, OnInit, PLATFORM_ID, effect, inject } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { SidbarComponent } from '../sidbar/sidbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { PrimeNGConfig } from 'primeng/api';
import { initFlowbite } from 'flowbite';
import { AssociationService } from '../../../core/services/association/association.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Employee } from '../../../core/models/employee';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../../../core/services/employee/employee.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SidebarModule,
    SidbarComponent,
    CommonModule,
    ButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig, @Inject(PLATFORM_ID) private platformId: Object,
    private associationService: AssociationService) {

  }
  gfg: boolean = false
  assossioson: any
  authService = inject(AuthService)
  currentUser: any
  employeeService = inject(EmployeeService)
  associationId = localStorage.getItem('associationId') || ''
  ngOnInit() {
    this.primengConfig.ripple = true;
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite()
    }
    this.associationService.getAssociation(JSON.parse(this.associationId)).subscribe({
      next: (data) => {
        this.assossioson = data
        console.log(this.assossioson)
      },
      error: (error) => {
        console.log(error)
      }
    })
    // this.associationService.associationData.subscribe(value => {
    //   console.log('New value:', value);
    //   this.assossioson = value
    // })
    this.getCurrentUser()
  }
  getCurrentUser() {
    const employeeId = localStorage.getItem('employee') || ''
    console.log(employeeId)
    this.employeeService.getEmployeeById(JSON.parse(employeeId).id).subscribe({
      next: (response) => {
        console.log('suceess')
        this.currentUser = response.result.employee.name
        console.log(response)
        this.authService.currentUserSig.set(response.result.employee)
        console.log(this.authService.currentUserSig())
      },
      error: (error) => {
        console.log(error.error.message)
        this.authService.currentUserSig.set(null)

      }
    })
  }

}

