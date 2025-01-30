import { Component, OnInit } from '@angular/core';
import { AssociationService } from '../../core/services/association/association.service';
import { Association } from '../../core/models/association';


@Component({
    selector: 'app-association',
    standalone: true,
    imports: [],
    templateUrl: './association.component.html',
    styleUrl: './association.component.scss'
})
export class AssociationComponent implements OnInit {
    association: Association = {};
    associationId = localStorage.getItem('associationId') || '';
    constructor(private associationService: AssociationService) { }
    ngOnInit(): void {
        if (this.associationId) {
            this.getAssociation()
        }
    }
    getAssociation() {
        this.associationService.getAssociation(JSON.parse(this.associationId)).subscribe({
            next: (data) => {
                this.association = data;
                console.log(this.association)
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
}
