import { Department } from "./department";
import { IRole } from "./role";

export interface Employee {
    id: number,
    name?: string;
    job_number?: number;
    ID_number?: number;
    address?: string;
    gender?: 'maile' | 'femaile'; // Assuming you meant 'male' instead of 'maile'
    age?: number;
    birth_date: Date;
    mobile?: string;
    image?: string;
    department: Department
    role_id: IRole
    association_id: number
    email?: string
    otp?: string
    otpExpier?: Date
    password?: string
}
export interface EmployeeResponse {
    employees: Employee[];
    employee: Employee;
    token?: string;
    emplyeeCount: number
}
