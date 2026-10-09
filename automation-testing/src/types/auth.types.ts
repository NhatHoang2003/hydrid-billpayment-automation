export interface TokenResponse {
    access_token: string;
    token_type: 'Bearer';
    expires_in: number;
    scope?: string;
}

export interface TokenRequest {
    grant_type?: string;
    client_id?: string;
    client_secret?: string;
    username?: string;
    password?: string;
    refresh_token?: string;
}