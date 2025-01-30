import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../models/api-response';
import { Observable } from 'rxjs';
import { DirectorsBoardMembers, DirectorsBoardResponse } from '../../models/directors-board-members';

@Injectable({
  providedIn: 'root'
})
export class DirectorsBoardMembersService {

  constructor(private http: HttpClient) { }

  getDirectorsBoardMembers(association_id: number): Observable<ApiResponse<DirectorsBoardResponse>> {
   
    return this.http.get<ApiResponse<DirectorsBoardResponse>>(`${environment.apiUrl}/directors_board/all/${association_id}`)
  }
  addDirectorsBoardMember(data: FormData) {
    return this.http.post<DirectorsBoardMembers>(`${environment.apiUrl}/directors_board/add`, data)
  }
  updateDirectorsBoardMember(id: number, data: FormData) {
    return this.http.patch<DirectorsBoardMembers>(`${environment.apiUrl}/directors_board/${id}`, data)
  }
  deleteDirectorsBoardMember(id: number) {
    return this.http.delete<DirectorsBoardMembers>(`${environment.apiUrl}/directors_board/${id}`)
  }
}
