export interface Beneficiary {
    id?: number,
    name?: string;
    record_history?: Date;
    file_no?: number;
    gender?: "maile" | "femaile";
    birth_date?: Date;
    nationality?: string;
    marital_status?: string;
    educational_level?: string;
    job?: string;
    scientific_certificates?: string;
    employer?: string;
    monthly_income_from?: number;
    monthly_income_to?: number;
    housing_type?: string;
    mobility_status?: "ليس لديه خادم" | "لايستطيع الحركة بمفرده" | "ليس لديه وسيلة نقل";
    email?: string;
    home_address?: string;
    work_address?: string;
    Image?: string;
    age?: number;
    type?: "الموظفين" | "مجتمعى" | "المرضى";
    // identity: any,
    close_person?: any,
    illnesses?: any,
    dependents?: any,
    services?: any,
    home_number?: any,
    work_number?: any,
    phone_number?: any,
    whatsApp_number?: any
    illnesse?: any,
    identity?: any
    attachments?: any
    contact_numbers?: any
    beneficiary_sevices?:any
}
export interface beneficiaryResponse {
    beneficiary?: Beneficiary,
    beneficiaries?: Beneficiary[]
}
export interface allbeneficiaryResponse {
    beneficiaries: Beneficiary[]
}


