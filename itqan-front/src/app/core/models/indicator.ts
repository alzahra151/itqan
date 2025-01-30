export interface Indicator {
    id: number
    title?: string,
    description?: string

}
export interface IndicatorResponse {
    indicatories: Indicator[],
    indicator: Indicator
}
