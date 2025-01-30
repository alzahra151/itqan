import { Department } from "./department";

export interface Administration {
    id?: number,
    name?: string,
    departments?: Array<Department>,
    association_id?: number
}
