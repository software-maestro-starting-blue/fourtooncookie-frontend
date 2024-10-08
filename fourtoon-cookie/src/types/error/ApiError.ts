import { API_STATUS } from "../api";

export class ApiError extends Error {
    
    private status: API_STATUS | null;

    constructor(message: string, status: API_STATUS | null = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }

    getStatus(): API_STATUS | null {
        return this.status;
    }
}