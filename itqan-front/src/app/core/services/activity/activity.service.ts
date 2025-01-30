import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity, ActivityResult } from '../../models/activity';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }
  getActivities(association_id: number): Observable<ApiResponse<ActivityResult>> {
    return this.http.get<ApiResponse<ActivityResult>>(`${environment.apiUrl}/activity/all/${association_id}`)
  }
  addActivity(data:Activity) {
    return this.http.post(`${environment.apiUrl}/activity/add`,data)
  }
}
