import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administration } from '../../models/administration';
import { environment } from '../../../../environments/environment';
import { Department, DepartmentResponse } from '../../models/department';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClient) { }
  addAdministration(data: Administration) {
    return this.http.post(`${environment.apiUrl}/administration/add`, data)

  }
  getAdministrations(association_id: number): Observable<Administration[]> {
    return this.http.get<Administration[]>(`${environment.apiUrl}/administration/all/${association_id}`)
  }
  addDepartment(data: Department) {
    return this.http.post(`${environment.apiUrl}/department/add_department`, data)
  }
  getDeparments(association_id: number): Observable<ApiResponse<DepartmentResponse>> {
    return this.http.get<ApiResponse<DepartmentResponse>>(`${environment.apiUrl}/department/all/${association_id}`)
  }
  deleteDeparment(id: number) {
    return this.http.delete(`${environment.apiUrl}/department/delete/${id}`)
  }
  updateDeparment(id: number, data: Department) {
    return this.http.patch(`${environment.apiUrl}/department/update/${id}`, data)
  }
  deleteAdminstration(id: number) {
    return this.http.delete(`${environment.apiUrl}/administration/${id}`)
  }
  getdeparmentById(id: number) {
    return this.http.get(`${environment.apiUrl}/department/${id}`)
  }
  updateAdminstration(id: any, data: Administration) {
    return this.http.patch(`${environment.apiUrl}/administration/${id}`, data)

  }
}
