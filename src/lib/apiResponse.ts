export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: {
        message: string;
        code: number;
    };
}

export function successResponse<T>(
    data: T,
    message: string = ''
): ApiResponse<T> {
    return {
        success: true,
        data,
        message,
    };
}

export function errorResponse(
    errorMessage: string,
    code: number = 400
): ApiResponse<null> {
    return {
        success: false,
        error: {
            message: errorMessage,
            code,
        },
    };
}
