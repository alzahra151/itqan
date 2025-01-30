import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Beneficiary, allbeneficiaryResponse, beneficiaryResponse } from '../../models/beneficiary';
import { ApiResponse } from '../../models/api-response';
import { ExectivePlanBenficiery } from '../../models/exective-plan-benficiery';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  constructor(private http: HttpClient) { }
  addBeneficiaryWithAttachments(data: Beneficiary, attachments: any): Observable<beneficiaryResponse> {
    // First request
    return this.http.post<beneficiaryResponse>(`${environment.apiUrl}/beneficiary/add`, data)
      .pipe(
        switchMap(response => {
          return this.http.post(`${environment.apiUrl}/attachment/add/${response.beneficiary?.id}`, attachments)
            .pipe(
              catchError(err => {
                // If attachment addition fails, delete the beneficiary
                return this.http.delete(`${environment.apiUrl}/beneficiary/${response.beneficiary?.id}`).pipe(
                  // Optionally log the deletion error if needed
                  catchError(deleteError => {
                    console.error('Error deleting beneficiary:', deleteError);
                    return throwError(deleteError); // rethrow the error
                  }),
                  // Rethrow the attachment error after the delete
                  switchMap(() => throwError(err))
                );
              })
            );
        })
      );
  }
  addBeneficiary(data: Beneficiary): Observable<ApiResponse<allbeneficiaryResponse>> {
    return this.http.post<ApiResponse<allbeneficiaryResponse>>(`${environment.apiUrl}/beneficiary/add`, data)
  }
  getBeneficiaries(filters: any, association_id: number) {
    let params = new HttpParams();
    for (let key in filters) {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    }
    console.log(params)
    return this.http.get<ApiResponse<allbeneficiaryResponse>>(`${environment.apiUrl}/beneficiary/all/${association_id}`, { params })
  }
  getBeneficiariesByExectivePlanId(exective_plan_id: number): Observable<ApiResponse<allbeneficiaryResponse>> {
    return this.http.get<ApiResponse<allbeneficiaryResponse>>(`${environment.apiUrl}/exective_plan_benficairy/beneficaries/${exective_plan_id}`)
  }
  getBeneficiaryById(id: number): Observable<ApiResponse<beneficiaryResponse>> {
    return this.http.get<ApiResponse<beneficiaryResponse>>(`${environment.apiUrl}/beneficiary/${id}`)

  }
  updateBeneficiariesByExectivePlanId(data: ExectivePlanBenficiery[]): Observable<ApiResponse<allbeneficiaryResponse>> {
    return this.http.patch<ApiResponse<allbeneficiaryResponse>>(`${environment.apiUrl}/exective_plan_benficairy/beneficaries`, data)
  }
  updateBeneficiaryEmolyessByExectivePlanId(data: ExectivePlanBenficiery[]): Observable<ApiResponse<allbeneficiaryResponse>> {
    return this.http.patch<ApiResponse<allbeneficiaryResponse>>(`${environment.apiUrl}/exective_plan_benficairy/employees`, data)
  }
  deleteBeneficiary(id: number) {
    return this.http.delete<Beneficiary>(`${environment.apiUrl}/beneficiary/${id}`)
  }
}
