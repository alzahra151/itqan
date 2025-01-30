import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IRole, IRoleResponse } from '../../models/role';
import { ApiResponse } from '../../models/api-response';
import { Observable, catchError, map, tap } from 'rxjs';
import { json } from 'stream/consumers';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  http = inject(HttpClient)
  emplyeeRole: IRole = {}
  constructor() {
    // this.getEmployeeRole()
  }
  getEmployeeRole(id:any) {
    
    // const employeeData = JSON.parse(localStorage.getItem('employee') || "{}")
    // console.log('test', employeeData)
    return this.http.get<ApiResponse<IRoleResponse>>(`${environment.apiUrl}/role/${id}`).pipe(
        tap(() => console.log('Observable created')),
        map(response => {
          console.log(response.result.role)
          return response.result.role
        }),
        catchError(error => {
          console.error('Error fetching employee role:', error);
          throw 'Error fetching employee role';
        }
        ))
  }
  hasRole(role: string,id:any): Observable<boolean> {
    return this.getEmployeeRole(id).pipe(
      map(employeeRole => {
        console.log('Checking if employee has role:', role, employeeRole.name === role);
        return employeeRole.name === role;
      })
    );
  }
  getRoles(): Observable<ApiResponse<IRoleResponse>> {
    return this.http.get<ApiResponse<IRoleResponse>>(`${environment.apiUrl}/role`)
  }
}
