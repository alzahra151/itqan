import { Activity } from "./activity";
import { BeneficiaryCategory } from "./beneficiary-category";
import { ExectivePlan } from "./exective-plan";
import { Goal } from "./goal";
import { Mission } from "./mission";
import { StratigicPlan } from "./stratigic-plan";
import { SubGoal } from "./sub-goal";

export interface PhasedPlan {
    id: number;
    title?: string;
    description?: string;
    goal_id?: number;
    goal?: Goal;
    // goal: Goal;
    start_date: Date;
    end_date: Date;
    Strategic_plan?: StratigicPlan,
    executive_plans?: ExectivePlan[];
    sub_goals: any
}
export interface PhasedPlanResponse {
    phased_plans: PhasedPlan[];
    phased_plan: PhasedPlan;
}
