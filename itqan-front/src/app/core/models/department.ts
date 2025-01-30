export interface Department {
    name?: string,
    code?: number,
    transfer_number?: number,
    association_id: number
}

export interface DepartmentResponse {
    departments: Department[]
    department: Department
}

