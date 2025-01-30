import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Volunteer, VolunteerResponse } from '../../models/volunteer';
import { ApiResponse } from '../../models/api-response';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  constructor(private http: HttpClient) { }

  getVolunteers(association_id: number): Observable<ApiResponse<VolunteerResponse>> {

    return this.http.get<ApiResponse<VolunteerResponse>>(`${environment.apiUrl}/volunteer/all/${association_id}`)
  }
  addVolunteer(data: FormData) {
    return this.http.post<Volunteer>(`${environment.apiUrl}/volunteer/add`, data)
  }
  updateVolunteer(id: number, data: FormData) {
    return this.http.patch<Volunteer>(`${environment.apiUrl}/volunteer/${id}`, data)
  }
  deleteVolunteer(id: number) {
    return this.http.delete<Volunteer>(`${environment.apiUrl}/volunteer/${id}`)
  }
}
