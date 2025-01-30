import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { MissionResponse } from '../../models/mission';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private http: HttpClient) { }
  getEmployeeMissions(employeeId: number): Observable<ApiResponse<MissionResponse>> {
    return this.http.get<ApiResponse<MissionResponse>>(`${environment.apiUrl}/mission/employee/${employeeId}`)
  }
  getMissionById(id: number): Observable<ApiResponse<MissionResponse>> {
    return this.http.get<ApiResponse<MissionResponse>>(`${environment.apiUrl}/mission/${id}`)
  }
  getCompletedMissions(): Observable<ApiResponse<MissionResponse>> {
    return this.http.get<ApiResponse<MissionResponse>>(`${environment.apiUrl}/mission/completed`)
  }
  updateMission(id: number,data:any): Observable<ApiResponse<MissionResponse>> {
    return this.http.patch<ApiResponse<MissionResponse>>(`${environment.apiUrl}/mission/${id}`,data)
  }
  approveMission(id: number) {
    return this.http.patch<ApiResponse<MissionResponse>>(`${environment.apiUrl}/mission/approve/${id}`, {})
  }
  addCompletedProcedure(data:any) {
    return this.http.post<ApiResponse<MissionResponse>>(`${environment.apiUrl}/completed_procedure/add`, data)
  }
}
