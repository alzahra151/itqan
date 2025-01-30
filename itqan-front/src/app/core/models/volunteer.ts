export interface Volunteer {
    id:number
    name: string;
    ID_number: string;
    mobile: string;
    email: string;
    image: string;
    volunteer_opportunity_name: string;
    volunteering_type: string;
    volunteering_nature: string;
    volunteering_place: string;
    volunteering_readiness: boolean;
    start_date: Date;
    end_date: Date;
    association_id: number;
    attachments: Array<any>
}
export interface VolunteerResponse {
    volunteers: Volunteer[];
    volunteer: Volunteer;
}

