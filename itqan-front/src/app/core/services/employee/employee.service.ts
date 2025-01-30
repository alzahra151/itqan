import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Employee, EmployeeResponse } from '../../models/employee';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  getEmployees(filters: any, association_id: number): Observable<ApiResponse<EmployeeResponse>> {
    let params = new HttpParams();
    for (let key in filters) {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    }
    console.log(params)
    return this.http.get<ApiResponse<EmployeeResponse>>(`${environment.apiUrl}/employee/all/${association_id}`, { params })
  }
  getEmployeeById(id: number): Observable<ApiResponse<EmployeeResponse>> {
    return this.http.get<ApiResponse<EmployeeResponse>>(`${environment.apiUrl}/employee/${id}`)

  }
  addEmployee(data: FormData) {
    return this.http.post<Employee>(`${environment.apiUrl}/employee/add`, data,
      {
        headers: {
          Accept: '*/*',
          // 'Content-Type': 'multipart/form-data',
        }
      }
    )
  }
  updateEmployee(id: number, data: FormData) {
    return this.http.patch<Employee>(`${environment.apiUrl}/employee/${id}`, data)
  }
  deleteEmployee(id: number) {
    return this.http.delete<Employee>(`${environment.apiUrl}/employee/${id}`)
  }

  getEmployeeesByExcutivePlanId(exective_plan_id: number): Observable<ApiResponse<EmployeeResponse>> {
    return this.http.get<ApiResponse<EmployeeResponse>>(`${environment.apiUrl}/exective_plan_benficairy/employees/${exective_plan_id}`)

  }
}
