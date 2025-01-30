import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddAssociationComponent } from '../add-association/add-association.component';
import { AssociationComponent } from '../association/AssociationComponent';

@Component({
  selector: 'app-ckeck-association',
  standalone: true,
  imports: [
    AddAssociationComponent,
    AssociationComponent
  ],
  templateUrl: './ckeck-association.component.html',
  styleUrl: './ckeck-association.component.scss'
})
export class CkeckAssociationComponent implements OnInit {
  associationId = JSON.parse(localStorage.getItem('associationId') || '')
  constructor(private changeDetectorRef: ChangeDetectorRef,) { }
  ngOnInit(): void {
    this.associationId = JSON.parse(localStorage.getItem('associationId') || '')
    console.log(this.associationId)
    this.changeDetectorRef.detectChanges();
  }
}
