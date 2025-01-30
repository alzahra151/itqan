import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { Service, serviceResponse } from '../../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  addService(data: Service) {
    return this.http.post(`${environment.apiUrl}/service/add`, data)
  }
  getServices(association_id: number): Observable<ApiResponse<serviceResponse>> {
    return this.http.get<ApiResponse<serviceResponse>>(`${environment.apiUrl}/service/all/${association_id}`)
  }
  updateService(id: number, data: FormData) {
    return this.http.patch<Service>(`${environment.apiUrl}/service/${id}`, data)
  }
  deleteService(id: number) {
    return this.http.delete<Service>(`${environment.apiUrl}/service/${id}`)
  }
}
