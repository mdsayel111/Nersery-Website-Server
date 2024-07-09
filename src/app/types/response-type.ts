/* eslint-disable @typescript-eslint/no-explicit-any */
export type TResponse = {
    success: boolean;
    status: number;
    message: string;
    data?: any;
    path?: any[]
}