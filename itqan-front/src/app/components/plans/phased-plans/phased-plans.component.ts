import { Component } from '@angular/core';
import { PhasedPlanService } from '../../../core/services/phased_plan/phased-plan.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PhasedPlan } from '../../../core/models/phased-plan';
import { CommonModule, Location } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ExectivePlan, PlansByMonth } from '../../../core/models/exective-plan';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { BenficieryType } from '../../../core/models/benficiery-type';
import { EnumUtils } from '../../../core/utils/enum-utils';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-phased-plans',
  standalone: true,
  imports: [
    CommonModule,
    AccordionModule, RouterLink,
    TableModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    RadioButtonModule
  ],
  templateUrl: './phased-plans.component.html',
  styleUrl: './phased-plans.component.scss'
})
export class PhasedPlansComponent {
  planIdParam: number = 0
  plan!: PhasedPlan
  excetivePlans!: any
  visible: boolean = false
  filteredPlansByMonth: any[] = [];
  nameQuery: string = '';
  startDateQuery: string = '';
  endDateQuery: string = '';
  // beneficiery_type: [] = [];
  selectedType: BenficieryType | undefined
  Benficierytype: BenficieryType = BenficieryType.Employee
  sub_goal_id:number |undefined=0
  type: { key: string, value: string }[];
  constructor(private phasedPlanService: PhasedPlanService,
    private route: ActivatedRoute,
    private location: Location
  ) { 
    this.type = EnumUtils.getEnumValues(BenficieryType)
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params)
      if (params['id']) {
        this.planIdParam = +params['id'];
        console.log(this.planIdParam)
        this.getPlanById()
      }
    })
   
  }
  getPlanById() {
    this.phasedPlanService.getPlanById(this.planIdParam).subscribe({
      next: (data) => {
        this.plan = data.result.phased_plan
        console.log(this.plan)
        if (this.plan) {
          this.getExcetivePlanByPhasedPlan()
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  getExcetivePlanByPhasedPlan() {
    this.phasedPlanService.getExcetivePlanByPhasedPlan(this.planIdParam).subscribe({
      next: (data) => {
        this.excetivePlans = data
        this.filteredPlansByMonth = this.excetivePlans;
        console.log(this.excetivePlans)
        console.log(Array.isArray(this.excetivePlans))
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  searchPlans(): void {
    this.filteredPlansByMonth = this.excetivePlans.map((monthData: any) => {
      return {
        month: monthData.month,
        plans: monthData.plans.filter((plan: any) =>
          this.isMatch(plan)
        )
      };
    }).filter((monthData: any) => monthData.plans.length > 0); // Remove empty months
  }

  private isMatch(plan: any): boolean {
    // Check if name matches
    const matchesName = this.nameQuery ? plan.sub_goal.name?.toLowerCase().includes(this.nameQuery.toLowerCase()) : true;

    // Convert query dates if they exist
    const startDateValid = this.startDateQuery ? new Date(this.startDateQuery).setHours(0, 0, 0, 0) : null;
    const endDateValid = this.endDateQuery ? new Date(this.endDateQuery).setHours(0, 0, 0, 0) : null;

    // Normalize plan dates to remove time component
    const planStartDate = new Date(plan.start_date).setHours(0, 0, 0, 0);
    const planEndDate = new Date(plan.end_date).setHours(0, 0, 0, 0);

    // Check if plan dates are within the query range
    const matchesStartDate = startDateValid ? planStartDate >= startDateValid : true;
    const matchesEndDate = endDateValid ? planEndDate <= endDateValid : true;

    // Debugging output
    console.log("Start Date Query:", startDateValid ? new Date(startDateValid) : "None", "Plan Start Date:", new Date(planStartDate));
    console.log("End Date Query:", endDateValid ? new Date(endDateValid) : "None", "Plan End Date:", new Date(planEndDate));

    // Return final match result
    return matchesName && matchesStartDate && matchesEndDate;
  }
  showDialog(id:number |undefined) {
    this.visible = true
    this.sub_goal_id=id
  }
  backRoute() {
    this.location.back()
  }
}
