import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { environment } from '../../../../environments/environment';
import { Indicator, IndicatorResponse } from '../../models/indicator';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {

  constructor(private http: HttpClient) { }
  addIndicator(data: Indicator) {
    return this.http.post(`${environment.apiUrl}/indicator/add`, data)
  }
  getIndicatories(association_id: number): Observable<ApiResponse<IndicatorResponse>> {
    return this.http.get<ApiResponse<IndicatorResponse>>(`${environment.apiUrl}/indicator/all/${association_id}`)
  }
  updateIndicator(id: number, data: FormData) {
    return this.http.patch<Indicator>(`${environment.apiUrl}/indicator/${id}`, data)
  }
  deleteIndicator(id: number) {
    return this.http.delete<Indicator>(`${environment.apiUrl}/indicator/${id}`)
  }
}
