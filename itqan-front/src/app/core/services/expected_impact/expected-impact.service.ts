import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyAaaaRecord } from 'dns';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpectedImpactService {

  constructor(private http: HttpClient) { }
  addExpected_impact(data: any) {
    return this.http.post(`${environment.apiUrl}/expected_impact/add`, data)
  }
  getExpected_impact(association_id: number) {
    return this.http.get(`${environment.apiUrl}/expected_impact/all/${association_id}`)
  }
}
