import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { SubGoal, SubGoalResponse } from '../../models/sub-goal';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(private http: HttpClient) { }
  getSubGoals(goal_id: number): Observable<ApiResponse<SubGoalResponse>> {
    return this.http.get<ApiResponse<SubGoalResponse>>(`${environment.apiUrl}/sub_goal/goal/${goal_id}`)
  }
  getSubGoalByID(id: number): Observable<ApiResponse<SubGoalResponse>>  {
    return this.http.get<ApiResponse<SubGoalResponse>>(`${environment.apiUrl}/sub_goal/${id}`)
  }
}
