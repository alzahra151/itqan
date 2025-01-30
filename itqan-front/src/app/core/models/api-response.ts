export interface ApiResponse<T> {
    success: boolean;
    status: number;
    result: T
}
