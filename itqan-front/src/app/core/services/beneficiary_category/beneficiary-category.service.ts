import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BeneficiaryCategory } from '../../models/beneficiary-category';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryCategoryService {

  constructor(private http: HttpClient) { }
  getBeneficiary_categories(): Observable<BeneficiaryCategory[]> {
    return this.http.get<BeneficiaryCategory[]>(`${environment.apiUrl}/beneficiary_category`)
  }
}

