export interface DirectorsBoardMembers {
    id: number;
    name: string;
    ID_number: string;
    address: string;
    gender: "ذكر" | "انثى";
    birth_date: Date;
    mobile: string;
    email: string;
    image: string;
    joining_date: Date;
    membership_type: "داعمة" | "عادية";
    employer: string;
    is_founding_member?: boolean;
    is_board_directores_member?: boolean
    educational_level: string;
    joining_way: string;
    job: string;
    job_description: string;
    insurance_number: string;
    salary_support?: boolean;
    association_id: number;
    attachments: Array<any>
}
export interface DirectorsBoardResponse {
    Directors_board_members: DirectorsBoardMembers[];
    Directors_board_member: DirectorsBoardMembers;
  
}
