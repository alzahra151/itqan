import { Routes } from '@angular/router';
import { LayoutComponent } from './components/mainLayout/layout/layout.component';
import { HomeComponent } from './components/mainLayout/home/home.component';
import { AddAssociationComponent } from './components/add-association/add-association.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddStratgyPlanComponent } from './components/plans/add-stratgy-plan/add-stratgy-plan.component';
import { AddExecutivePlanComponent } from './components/plans/add-executive-plan/add-executive-plan.component';
import { AdministrationsComponent } from './components/administrations/administrations.component';
import { StrategicPlanDetailsComponent } from './components/plans/strategic-plan-details/strategic-plan-details.component';
import { StrategicPlansComponent } from './components/plans/strategic-plans/strategic-plans.component';
import { ExecutivePlansComponent } from './components/plans/executive-plans/executive-plans.component';
import { AddBeneficiaryComponent } from './components/add-beneficiary/add-beneficiary.component';
import { AddPhasedPlanComponent } from './components/plans/add-phased-plan/add-phased-plan.component';
import { PhasedPlansComponent } from './components/plans/phased-plans/phased-plans.component';
import { LoginComponent } from './components/login/login.component';
import { Role } from './core/models/role';
import { roleGuard } from './core/guards/role.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { missionGuard } from './core/guards/mission.guard';
import { EmployeeMissionsComponent } from './components/employee-missions/employee-missions.component';
import { BeneficiariesComponent } from './components/beneficiaries/beneficiaries.component';
import { AssociationComponent } from './components/association/AssociationComponent';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { CkeckAssociationComponent } from './components/ckeck-association/ckeck-association.component';
import { WelcomeComponent } from './components/mainLayout/welcome/welcome.component';
import { CarouselComponent } from './components/mainLayout/carousel/carousel.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ApproveExectiveplanComponent } from './components/approve-exectiveplan/approve-exectiveplan.component';
import { ApproveExectiveplanDetailsComponent } from './components/approve-exectiveplan-details/approve-exectiveplan-details.component';
import { EmplyeeMissionDetailsComponent } from './components/emplyee-mission-details/emplyee-mission-details.component';
import { AddIndicatorComponent } from './components/add-indicator/add-indicator.component';
import { CurrentPlanComponent } from './components/plans/current-plan/current-plan.component';
import { GetBenficiaryDetailsComponent } from './components/get-benficiary-details/get-benficiary-details.component';
import { EditStratigicPlanComponent } from './components/plans/edit-stratigic-plan/edit-stratigic-plan.component';
import { DirectorsBoardMembersComponent } from './components/directors-board-members/directors-board-members.component';
import { SupportersComponent } from './components/supporters/supporters.component';
import { VolunteersComponent } from './components/volunteers/volunteers.component';
import { EditPhasedPlanComponent } from './components/plans/edit-phased-plan/edit-phased-plan.component';
import { ExcutivePlanDetailsComponent } from './components/plans/excutive-plan-details/excutive-plan-details.component';
import { UpdateExcutivePlanComponent } from './components/plans/update-excutive-plan/update-excutive-plan.component';
import { CompletedMissionsComponent } from './components/completed-missions/completed-missions.component';

export const routes: Routes = [
    {
        path: '', component: WelcomeComponent,
        children: [
            { path: '', component: CarouselComponent },
            { path: 'login', component: LoginComponent },
            { path: 'reset-password/:email', component: ResetPasswordComponent }
        ]
    },
    {
        path: 'home',
        component: LayoutComponent, // this is the component with the <router-outlet> in the template
        canActivate: [authGuard],
        children: [
            {
                path: '', // child route path
                component: HomeComponent, // child route component that the router renders
            },
            {
                path: 'add-association',
                component: AddAssociationComponent, canActivate: [roleGuard], data: { requiredRole: Role.Manager } // another child route component that the router renders
            },
            {
                path: 'add-employee',
                component: AddEmployeeComponent, // another child route component that the router renders
            },
            {
                path: 'add-stratgy-plan',
                component: CurrentPlanComponent, // another child route component that the router renders
            },
            {
                path: 'edit-stratgy-plan/:id',
                component: EditStratigicPlanComponent, // another child route component that the router renders
            },
            {
                path: 'edit-excutive-plan/:id',
                component: UpdateExcutivePlanComponent, // another child route component that the router renders
            },
            {
                path: 'add-executive-plan/:phased_plan_id/:sub_goal_id',
                component: AddExecutivePlanComponent, // another child route component that the router renders
            },
            {
                path: 'administrations',
                component: AdministrationsComponent, // another child route component that the router renders
            },
            {
                path: 'plans',
                component: StrategicPlansComponent, // another child route component that the router renders
            },
            {
                path: 'plans/:id',
                component: StrategicPlanDetailsComponent, // another child route component that the router renders
            },
            {
                path: 'phased-plans/:id/employee/:empoyeeId',
                component: EmployeeMissionsComponent, // another child route component that the router renders
            },
            {
                path: 'edit-phased-plan/:id',
                component: EditPhasedPlanComponent, // another child route component that the router renders
            },
            {
                path: 'phased-plans/:id',
                component: PhasedPlansComponent,
                // canActivate: [missionGuard], data: { requiredRole: Role.Manager } // another child route component that the router renders
            },

            {
                path: 'add-beneficiary',
                component: AddBeneficiaryComponent, // another child route component that the router renders
            },
            {
                path: 'add-phased-plan/:id',
                component: AddPhasedPlanComponent
            },
            {
                path: 'unauthorized',
                component: UnauthorizedComponent
            },
            {
                path: 'beneficaries',
                component: BeneficiariesComponent
            },
            {
                path: 'association',
                component: CkeckAssociationComponent
            },
            {
                path: 'add-service',
                component: AddServiceComponent
            },
            {
                path: 'services',
                component: AddServiceComponent
            },
            {
                path: 'welcome',
                component: WelcomeComponent
            },

            // {
            //     path: 'approve-exective-plans',
            //     component: ApproveExectiveplanComponent
            // },
            // {
            //     path: 'approve-exective-plans-details/:id',
            //     component: ApproveExectiveplanDetailsComponent
            // },
            {
                path: 'employee-missions',
                component: EmployeeMissionsComponent
            },
            {
                path: 'employee-missions/:id',
                component: EmplyeeMissionDetailsComponent
            },
            {
                path: 'add-indicator',
                component: AddIndicatorComponent
            },
            {
                path: 'indicators',
                component: AddIndicatorComponent
            },
            {
                path: 'beneficaries/:id',
                component: GetBenficiaryDetailsComponent
            },
            {
                path: 'directors-board-members',
                component: DirectorsBoardMembersComponent
            },
            {
                
                path: 'supporters',
                component: SupportersComponent
            },
            {
                
                path: 'volunteers',
                component: VolunteersComponent
            },
            {

                path: 'excutive-plan/:id',
                component: ExcutivePlanDetailsComponent
            },
            {
                path: 'completed-missions',
                component:CompletedMissionsComponent
            }
        ],
    },
];
