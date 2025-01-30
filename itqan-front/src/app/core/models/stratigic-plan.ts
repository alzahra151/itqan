import { Goal } from "./goal";
import { PhasedPlan } from "./phased-plan";
import { SubGoal } from "./sub-goal";

export interface StratigicPlan {
    id?: number;
    name?: string;
    start_date: Date;
    end_date: Date;
    introduction?: string;
    goals?: Goal[];
    sub_goals?: SubGoal[];
    phased_plans?: PhasedPlan[]
    association_id?:number
}

export interface StratigicPlanResopnse {
    plans: StratigicPlan[],
    plan: StratigicPlan
}
