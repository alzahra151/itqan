import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AssociationService } from '../../core/services/association/association.service';
import { ResetPasswordService } from '../../core/services/reset-password/reset-password.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RoleService } from '../../core/services/role/role.service';
import { IRole } from '../../core/models/role';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fb = inject(FormBuilder)
  authService = inject(AuthService)
  loginForm: FormGroup
  showErrors: boolean = false
  backError!: string
  router = inject(Router)
  emplyeeRole: IRole = {}
  associationSerice = inject(AssociationService)
  resetPasswordService = inject(ResetPasswordService)

  // associationId = JSON.parse(localStorage.getItem('associationId') || '')
  constructor(private roleService:RoleService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  ngOnInit() {
  
  }
  login() {
    this.showErrors = false
    this.backError = ''
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response)
          // this.router.navigate(['/home'])
          this.getRole()
        },
        error: (error) => {
          console.log(error)
          this.backError = error.error?.message
        }
      })
    } else {
      this.showErrors = true
    }
  }
  getRole() {
    const employee = JSON.parse(localStorage.getItem('employee') || '');
    if (employee && employee.role_id) {
      this.roleService.getEmployeeRole(employee.role_id).subscribe({
        next: (response) => {
          console.log(response)
          this.emplyeeRole = response
          console.log(this.emplyeeRole.name)
          if (this.emplyeeRole.name == 'manager') {
            this.router.navigate(['/home'])
          } else if (this.emplyeeRole.name == 'employee') {
            this.router.navigate(['/home/employee-missions'])
          }
        },
        error: (error) => {
          console.log(error.error.message)
        }
      })
    }
  }
  resetPassword() {
    console.log(this.loginForm.get('email')?.value)
    this.resetPasswordService.resetPassword(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response)
        this.router.navigate(['/reset-password', this.loginForm.get('email')?.value])
      },
      error: (error) => {
        console.log(error)
        this.backError = error.error?.message
      }
    })
  }
}
