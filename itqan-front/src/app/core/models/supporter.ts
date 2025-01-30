export interface Supporter {
    id:number
    name: string;
    ID_number: string;
    mobile: string;
    email: string;
    image: string;
    entity_name: string;
    city: string;
    donation_type: string;
    donation_way: string;
    donate_periodically: boolean;
    repeat_donation: string;
    end_date: Date;
    association_id: number;
    attachments:any
}
export interface SupporterResponse {
    supporters: Supporter[];
    supporter: Supporter;

}
