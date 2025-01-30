import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { environment } from '../../../../environments/environment';
import { Supporter, SupporterResponse } from '../../models/supporter';

@Injectable({
  providedIn: 'root'
})
export class SupporterService {
  constructor(private http: HttpClient) { }

  getSupporters(association_id: number): Observable<ApiResponse<SupporterResponse>> {

    return this.http.get<ApiResponse<SupporterResponse>>(`${environment.apiUrl}/supporter/all/${association_id}`)
  }
  addSupporter(data: FormData) {
    return this.http.post<Supporter>(`${environment.apiUrl}/supporter/add`, data)
  }
  updateSupporter(id: number, data: FormData) {
    return this.http.patch<Supporter>(`${environment.apiUrl}/supporter/${id}`, data)
  }
  deleteSupporter(id: number) {
    return this.http.delete<Supporter>(`${environment.apiUrl}/supporter/${id}`)
  }
}
