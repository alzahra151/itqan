import { Component, inject, Input } from '@angular/core';
import { StrategicPlanService } from '../../../core/services/stratigic-plan/strategic-plan.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StratigicPlan } from '../../../core/models/stratigic-plan';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../../core/services/role/role.service';
import { IRole, Role } from '../../../core/models/role';

@Component({
  selector: 'app-strategic-plan-details',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './strategic-plan-details.component.html',
  styleUrl: './strategic-plan-details.component.scss'
})
export class StrategicPlanDetailsComponent {
  // private activatedRoute = inject(ActivatedRoute)
  planId: any
  plan!: StratigicPlan 
  emplyeeRole: IRole = {}
  IsManager: boolean = false
  emplyee = localStorage.getItem('employee') || ''
  employeeId = JSON.parse(this.emplyee).id
  // @Input() plan: StratigicPlan | undefined;
  constructor(private plansservices: StrategicPlanService, private route: ActivatedRoute, private roleService: RoleService) { }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params) {
        const classParam = params['id'];
        console.log('Class parameter:', classParam);
        this.plansservices.getstratigic_planByID(classParam).subscribe({
          next: (data) => {
            this.plan = data.result.plan
            console.log(this.plan)
          }, error: (error) => {
            console.log(error)
          }
        })
      }
    })
    const employee = JSON.parse(localStorage.getItem('employee') || '');
    this.roleService.getEmployeeRole(employee.role_id).subscribe({
      next: (response) => {
        console.log(response)
        this.emplyeeRole = response
        if (this.emplyeeRole.name == Role.Manager) {
          this.IsManager = true
        }
      },
      error: (error) => {
        console.log(error.error.message)
      }
    })
  }
}
