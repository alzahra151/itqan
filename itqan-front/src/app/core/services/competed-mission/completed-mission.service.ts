import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompletedMissions } from '../../models/completed-missions';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompletedMissionService {

  constructor(private http: HttpClient) { }
  addCompletedMission(data: CompletedMissions) {
    return this.http.post(`${environment.apiUrl}/completed_mission/add`, data)
  }
}
