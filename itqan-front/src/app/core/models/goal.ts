import { SubGoal } from "./sub-goal";

export interface Goal {
    id?: number;
    name?: string;
    description?: string;
    abbreviation?: string;
    sub_goals: SubGoal[]
}

export interface GoalResponse {
    goals: Goal[],
    goal: Goal
}

