import { Employee } from "./employee";

export interface CompletedMissions {
    name?: string;
    start_date?: Date;
    end_date?: Date;
    number_value?: string;
    description?: string;
    employee?: Employee
}
