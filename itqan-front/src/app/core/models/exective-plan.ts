import { Activity } from "./activity";
import { Beneficiary } from "./beneficiary";
import { BeneficiaryCategory } from "./beneficiary-category";
import { CompletedMissions } from "./completed-missions";
import { Employee } from "./employee";
import { Indicator } from "./indicator";
import { Mission } from "./mission";
import { PhasedPlan } from "./phased-plan";
import { SubGoal } from "./sub-goal";

export interface ExectivePlan {
    id?: number,
    name?: string;
    main_goal?: string;
    Requirements?: string;
    expected_impacts?: any;
    cost?: number;
    type?:string
    description?: string;
    activity_id?: number;
    beneficiary_id?: number;
    Strategic_plan_id?: number;
    repetition?: boolean;
    automated_reports?: boolean;
    follow_up?: boolean;
    out_of_plan?: boolean;
    plan_name?:string
    activity?: Activity;
    indicators?:any
    sub_goal?:SubGoal
    beneficiary_category?: BeneficiaryCategory;
    missions?: Mission[]
    approval?: boolean,
    beneficiaries?: Beneficiary[]
    employeesbeneficiary?: Employee[],
    completed_missions?: CompletedMissions[]
    beneficiaryList?: any
    beneficiaryemployeeList?: any
    start_date?: Date
    end_date?: Date
    phased_plan?: PhasedPlan
    implementation_place?:string
    completion_requires_beneficiaries?: boolean
    repetition_on_faild?: boolean
    repeat_type?: string
    directors_board?:any
}

export interface ExectivePlanResponse {
    plans: ExectivePlan[],
    plan: ExectivePlan,
    
}

export interface PlansByMonth {
    month: string;
    plansByMonth: ExectivePlan[];
    plans: ExectivePlan[]
}
