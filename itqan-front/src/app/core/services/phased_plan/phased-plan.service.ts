import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhasedPlan, PhasedPlanResponse } from '../../models/phased-plan';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { environment } from '../../../../environments/environment';
import { ExectivePlan, ExectivePlanResponse, PlansByMonth } from '../../models/exective-plan';

@Injectable({
  providedIn: 'root'
})
export class PhasedPlanService {

  constructor(private http: HttpClient) { }
  addPhasedPlan(data: PhasedPlan): Observable<ApiResponse<PhasedPlanResponse>> {
    return this.http.post<ApiResponse<PhasedPlanResponse>>(`${environment.apiUrl}/phased_plan/add`, data)
  }

  getPlanById(id: number): Observable<ApiResponse<PhasedPlanResponse>> {
    return this.http.get<ApiResponse<PhasedPlanResponse>>(`${environment.apiUrl}/phased_plan/${id}`)
  }
  getEmplyeePlanById(id: number, emplyeeId: number): Observable<ApiResponse<PhasedPlanResponse>> {
    return this.http.get<ApiResponse<PhasedPlanResponse>>(`${environment.apiUrl}/phased_plan/${id}/employee/${emplyeeId}`)
  }
  updatePlan(id: number, data: PhasedPlan): Observable<ApiResponse<PhasedPlanResponse>> {
    return this.http.patch<ApiResponse<PhasedPlanResponse>>(`${environment.apiUrl}/phased_plan/${id}`, data)
  }
  getExcetivePlanByPhasedPlan(phasedPlanId: number) {
    return this.http.get(`${environment.apiUrl}/executive_plan/phased_plan/${phasedPlanId}`,)
  }
}
