export enum Role {
    Manager = 'manager',
    Employee = 'employee'
}
export interface IRole {
    id?: number;
    name?: string
}
export interface IRoleResponse {
    role: IRole
    roles: IRole[]
}