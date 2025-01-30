import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }
  resetPassword(employee: { email: string }) {
    return this.http.post(`${environment.apiUrl}/reset_password/reset`, employee)
  }
  verfiyOtp(employee: { email: string; otp: string }) {
    return this.http.post(`${environment.apiUrl}/reset_password/verfiy`, employee)
  }
  changPassword(employee: { email: string; password: string }) {
    return this.http.post(`${environment.apiUrl}/reset_password/chang`, employee)
  }
}
