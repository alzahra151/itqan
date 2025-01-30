import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StratigicPlan, StratigicPlanResopnse } from '../../models/stratigic-plan';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class StrategicPlanService {

  constructor(private http: HttpClient) { }
  getstratigic_planByID(id: number): Observable<ApiResponse<StratigicPlanResopnse>> {
    return this.http.get<ApiResponse<StratigicPlanResopnse>>(`${environment.apiUrl}/strategic_plan/${id}`)
  }
  addStratigic_plan(data: StratigicPlan) {
    return this.http.post(`${environment.apiUrl}/strategic_plan/add`, data)
  }
  getstratigic_plans(association_id: number): Observable<StratigicPlan> {
    return this.http.get<StratigicPlan>(`${environment.apiUrl}/strategic_plan/all/${association_id}`)
  }
  updatePlan(id: number | null, data: StratigicPlan) {
    return this.http.patch(`${environment.apiUrl}/strategic_plan/${id}`,data)
  }
}
