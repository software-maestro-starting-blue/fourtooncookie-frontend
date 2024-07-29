export interface Session {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expires_at?: number;
    expires_in?: number;
}