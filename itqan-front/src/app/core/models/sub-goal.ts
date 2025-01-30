import { Goal } from "./goal";

export interface SubGoal {
    id?: number;
    name: string,
    description?: string,
    goal: Goal
}

export interface SubGoalResponse {
    sub_goals: SubGoal[],
    sub_goal: SubGoal
}