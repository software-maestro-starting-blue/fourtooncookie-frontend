
export class ApiError extends Error {
    
    private status: number | null;

    constructor(message: string, status: number | null = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }

    getStatus() {
        return this.status;
    }
}