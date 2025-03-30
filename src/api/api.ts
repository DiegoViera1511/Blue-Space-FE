export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

export interface ApiResponse<T> {
    status: number,
    message: number;
    errors?: string | null;
    data?: T | null;
}

export interface ApiError {
    message: string;
    status: number;
}
export const backendHost = "http://localhost:8080";
export const apiHost = backendHost+"/api"