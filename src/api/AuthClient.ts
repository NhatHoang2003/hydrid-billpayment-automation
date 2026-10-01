import { TokenRequest, TokenResponse } from '../types/auth.types';
import { BaseApiClient, RequestOptions } from './BaseApiClient';

export class AuthClient extends BaseApiClient {
    async getCurrentUser() {
        return this.get('/v1/auth/me');
    }

    async getToken(
        payload?: TokenRequest,
        options: RequestOptions = {}
    ) {
        return this.post<TokenResponse>(
            '/oauth/token',
            payload,
            options
        );
    }
}