export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

export interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

export interface ApiError {
    message: string;
    status: number;
}

export const apiHost = "http://localhost:8080/api"