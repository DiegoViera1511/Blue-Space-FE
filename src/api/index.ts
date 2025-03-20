import {ApiResponse, HttpMethod, ApiError, apiHost} from "./api.ts";

export interface HttpRequestProps {
    url: string;
    method: HttpMethod;
    data?: any;
    config?: RequestInit;
}

export const httpRequest = async <T>({url, method, data, config}: HttpRequestProps): Promise<ApiResponse<T>> => {
    try {
        const response = await fetch(apiHost + url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers
            },
            body: data ? JSON.stringify(data) : undefined,
            ...config
        });
        
        const responseData = await response.json();
        return {
            data: responseData,
            status: response.status,
            statusText: response.statusText
        };
    } catch (error) {
        const apiError: ApiError = {
            message: 'An unexpected error occurred: ' + JSON.stringify(error),
            status: 500
        };
        return Promise.reject(apiError);
    }
};