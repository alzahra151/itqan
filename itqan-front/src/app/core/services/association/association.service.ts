import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Association } from '../../models/association';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssociationService {
  private association = new BehaviorSubject<string | null>(localStorage.getItem('associationId' || ''));
  associationId$ = this.association.asObservable();
  constructor(private http: HttpClient) { }
  addAssociation(data: any) {
    return this.http.post(`${environment.apiUrl}/association/add`, data).pipe(
      tap((response: Association) => {
        // this.isAssociation.next(true); // Update the BehaviorSubject with the new data
      })
    );
  }
  getAssociation(id: any) {
    return this.http.get(`${environment.apiUrl}/association/${id}`
    )
  }
  updateAssociation(newValue: string | null) {
    localStorage.setItem('associationId', newValue || '');
    this.association.next(newValue);
  }
}
