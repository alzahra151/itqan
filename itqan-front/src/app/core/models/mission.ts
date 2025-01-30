import { Administration } from "./administration";
import { Employee } from "./employee";

export interface Mission {
    id?: number,
    name?: string;
    start_date?: Date;
    end_date?: Date;
    number_value: number;
    evaluation_method?: string;
    procedure: 'approval'| 'implementation'| "supervising"| "evaluation"|"authentication";
    procedure_date?: Date;
    description?: string;
    administration?: Administration;
    employee?: Employee,
    executive_plan_id: number,
    complete?: boolean,
    status?: string
    executive_plan?: any
    completed_procedures?:any
}
export interface MissionResponse {
    missions: Mission[],
    mission: Mission
}

