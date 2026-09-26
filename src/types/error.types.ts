export interface ApiErrorDetail {
    field?: string;
    message: string;
    code?: string;
}

export interface ApiErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
        traceId: string;
        timestamp: string;
        details?: ApiErrorDetail[];
    };
}