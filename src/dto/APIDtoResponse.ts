/**
 * API Response Interface.
 */
interface APIResponse {
    code: number;
    message: string;
    data?: any;
    errors?: any;
}

export default APIResponse;