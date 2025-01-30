import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../../core/services/reset-password/reset-password.service';
import { MessageService } from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FormsModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  isVerfiyOtp: boolean = false
  route = inject(ActivatedRoute)
  otp: string = ''
  password: string = ''
  backError!: string
  passwordMismatch: boolean = false
  confirmPassword: string = ''
  resetPasswordService = inject(ResetPasswordService)
  router = inject(Router)
  email: string = ''
  // messageService = inject(MessageService)
  constructor(private messageService: MessageService) { }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params)
      if (params['email']) {
        this.email = params['email'];
        console.log(' email:', this.email);
        this.show()
      }
    })
  }
  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }
  verfiyOtp() {
    this.resetPasswordService.verfiyOtp({ email: this.email, otp: this.otp }).subscribe({
      next: (response) => {
        console.log(response)
        this.isVerfiyOtp = true
        this.backError = ''
      },
      error: (error) => {
        console.log(error.error.message)
        this.backError = error.error.message
      }
    })
  }
  changPassword() {
    this.passwordMismatch = this.password !== this.confirmPassword;
    if (!this.passwordMismatch) {
      this.resetPasswordService.changPassword({ email: this.email, password: this.password }).subscribe({
        next: (response) => {
          console.log(response)
          this.router.navigate(['/login'])
          this.backError = ''
        },
        error: (error) => {
          console.log(error.error.message)
          this.backError = error.error.message
        }
      })
    }
  }
  reSendOtp() {
    this.resetPasswordService.resetPassword({ email: this.email }).subscribe({
      next: (response) => {
        console.log(response)
        this.backError = ''
      },
      error: (error) => {
        console.log(error)
        this.backError = error.error?.message
      }
    })
  }
}
