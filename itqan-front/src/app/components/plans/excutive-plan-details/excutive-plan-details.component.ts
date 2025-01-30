import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RoleService } from '../../../core/services/role/role.service';
import { ExectivePlan, ExectivePlanResponse } from '../../../core/models/exective-plan';
import { ExectivePlanService } from '../../../core/services/executive-plan/exective-plan.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TranslateModule } from '@ngx-translate/core';
import { BeneficiaryDirectorBoardComponent } from '../../beneficiery-lists/beneficiary-director-board/beneficiary-director-board.component';

@Component({
  selector: 'app-excutive-plan-details',
  standalone: true,
  imports: [
    CommonModule,
     RouterLink,
    TableModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    CalendarModule,
    TranslateModule,
    BeneficiaryDirectorBoardComponent
  ],
  templateUrl: './excutive-plan-details.component.html',
  styleUrl: './excutive-plan-details.component.scss'
})
export class ExcutivePlanDetailsComponent {
  item!:ExectivePlan
  constructor(private plansservices: ExectivePlanService, private route: ActivatedRoute, private roleService: RoleService) { }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params) {
        const planId = params['id'];
        console.log('Class parameter:', planId);
        this.plansservices.getPlanById(planId).subscribe({
          next: (data) => {
            this.item = data.result.plan
            console.log(this.item)
          }, error: (error) => {
            console.log(error)
          }
        })
      }
    })
}
}
