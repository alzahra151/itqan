import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExectivePlan, ExectivePlanResponse } from '../../models/exective-plan';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ExectivePlanService {

  constructor(private http: HttpClient) { }
  addExectivePlan(data: ExectivePlan) {
    return this.http.post(`${environment.apiUrl}/executive_plan/add`, data)
  }
  getPlanById(id: any): Observable<ApiResponse<ExectivePlanResponse>> {
    return this.http.get<ApiResponse<ExectivePlanResponse>>(`${environment.apiUrl}/executive_plan/${id}`,)
  }
  approveExectivePlan(id: number, data: ExectivePlan) {
    return this.http.patch(`${environment.apiUrl}/executive_plan/approve/${id}`, data)
  }
  getEmplyeeExcutivePlaneToArrprovel(employeeId: number): Observable<ApiResponse<ExectivePlanResponse>> {
    return this.http.get<ApiResponse<ExectivePlanResponse>>(`${environment.apiUrl}/executive_plan/approve/${employeeId}`,)
  }
  updateExectivePlan(id: number, data: ExectivePlan) {
    return this.http.patch(`${environment.apiUrl}/executive_plan/${id}`, data)
  }
}
