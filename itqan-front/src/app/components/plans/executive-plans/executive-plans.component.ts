import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TreeModule } from 'primeng/tree';
import { ExectivePlanService } from '../../../core/services/executive-plan/exective-plan.service';

@Component({
  selector: 'app-executive-plans',
  standalone: true,
  imports: [
    TreeModule,
    FormsModule,
    CommonModule,
    AccordionModule,
    DropdownModule,
    CalendarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './executive-plans.component.html',
  styleUrl: './executive-plans.component.scss'
})
export class ExecutivePlansComponent {
  plans: any
  constructor(private route: ActivatedRoute,
    private executivePlanService: ExectivePlanService) { }
  ngOnInit() {

    this.route.params.subscribe((params) => {
      if (params) {
        const classParam = params['id'];
        console.log('Class parameter:', classParam);
        this.executivePlanService.getPlanById(classParam).subscribe({
          next: (data) => {
            this.plans = data

          }, error: (error) => {
            console.log(error)
          }
        })
      }
    })
  }
  get lastendix() {
    // console.log(this.executivePlans.length - 1)
    return this.plans.length - 1
  }
}
