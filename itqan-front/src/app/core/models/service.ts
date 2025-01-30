export interface Service {
    id: number
    name?: string,
    description?: string

}
export interface serviceResponse {
    services: Service[],
    service: Service
}
