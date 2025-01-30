import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Employee, EmployeeResponse } from '../../models/employee';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from '../../models/jwt-payload';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router)
  currentUserSig = signal<Employee | undefined | null>(undefined);
  constructor(private http: HttpClient) { }
  login(emplyeeData: Employee): Observable<ApiResponse<EmployeeResponse>> {
    console.log(emplyeeData);
    // Make the login request first, and then fetch the employee details after that
    return this.http.post<ApiResponse<EmployeeResponse>>(`${environment.apiUrl}/employee/login`, emplyeeData).pipe(
      switchMap(response => {
        console.log(response);
        if (response.result?.token) {
          localStorage.setItem('token', response.result.token);
          const decoded = jwtDecode(response.result.token) as JwtPayload;
          console.log(decoded);

          // After the login, use the decoded token to fetch the employee details
          return this.http.get<ApiResponse<EmployeeResponse>>(`${environment.apiUrl}/employee/${decoded.id}`);
        } else {
          throw new Error('Login failed, no token returned');
        }
      }),
      tap(response => {
        // Store employee data and association ID in localStorage
        console.log(response);
        localStorage.setItem('employee', JSON.stringify(response.result.employee));
        localStorage.setItem('associationId', JSON.stringify(response.result.employee.association_id));

        // Set the current user details in a shared service (if required)
        this.currentUserSig.set(response.result.employee);
      })
    );
  }
  logOut() {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
    localStorage.clear()
  }

}
