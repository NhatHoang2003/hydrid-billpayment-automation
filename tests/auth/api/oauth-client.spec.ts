import { test, expect } from '../../../src/fixtures/apiFixture';
import { TokenResponseSchema } from '../../../src/schemas/auth.schemas';
import { ApiErrorResponseSchema } from '../../../src/schemas/common.schemas';

test.describe('POST /oauth/token - OAuth2 Token Endpoint', () => {
    test('@smoke @C001 @AUTH-001 valid client_credentials grant returns access token', async ({ authClient }) => {
        const response = await authClient.getToken({
            grant_type: 'client_credentials',
            client_id: 'demo-client',
            client_secret: 'demo-secret-789',
        });

        expect(response.status).toBe(200);

        const body = TokenResponseSchema.parse(response.data);

        expect(body.access_token).toBeTruthy();
        expect(body.token_type).toBe('Bearer');
        expect(body.expires_in).toBe(3600);


    });

    test('@security @C003 invalid client_id returns 401', async ({ authClient }) => {
        const response = await authClient.getToken({
            grant_type: 'client_credentials',
            client_id: 'wrong-client',
            client_secret: 'demo-secret-789',
        });

        expect(response.status).toBe(401);

        const body = ApiErrorResponseSchema.parse(response.data);
        expect(body.success).toBe(false);
        expect(body.error.code).toBe('INVALID_CLIENT');
        expect(body.error.message).toBe('Invalid client credentials');
    });

    test('@security @C004 @AUTH-004 invalid client_secret returns 401 unauthorized', async ({ authClient }) => {
        const response = await authClient.getToken({
            grant_type: 'client_credentials',
            client_id: 'demo-client',
            client_secret: 'wrong-secret',
        });

        expect(response.status).toBe(401);
        const body = ApiErrorResponseSchema.parse(response.data);

        expect(body.success).toBe(false);
        expect(body.error.code).toBe('INVALID_CLIENT');
        expect(body.error.message).toBe('Invalid client credentials');
    });

    test('@validation @C007 @AUTH-007 missing grant_type returns 400 bad request', async ({ authClient }) => {
        const response = await authClient.getToken({
            client_id: 'demo-client',
            client_secret: 'demo-secret-789',
        });

        expect(response.status).toBe(400);
        const body = ApiErrorResponseSchema.parse(response.data);

        expect(body.success).toBe(false);
        expect(body.error.code).toBe('UNSUPPORTED_GRANT_TYPE');
        expect(body.error.message).toBe('Unsupported grant_type: undefined. Supported: client_credentials, password, refresh_token');
    });

    test('@validation @C008 @AUTH-008 unsupported grant_type returns 400 bad request', async ({ authClient }) => {
        const response = await authClient.getToken({
            grant_type: 'invalid_grant',
            client_id: 'demo-client',
            client_secret: 'demo-secret-789',
        });

        expect(response.status).toBe(400);
        const body = ApiErrorResponseSchema.parse(response.data);

        expect(body.success).toBe(false);
        expect(body.error.code).toBe('UNSUPPORTED_GRANT_TYPE');
        expect(body.error.message).toBe('Unsupported grant_type: invalid_grant. Supported: client_credentials, password, refresh_token');
    });

    test('@validation @C009 @AUTH-009 missing client_id for client_credentials returns 401', async ({ authClient }) => {
        const response = await authClient.getToken({
            grant_type: 'client_credentials',
            client_secret: 'demo-secret-789',
        });

        expect(response.status).toBe(401);
        const body = ApiErrorResponseSchema.parse(response.data);

        expect(body.success).toBe(false);
        expect(body.error.code).toBe('INVALID_CLIENT');
        expect(body.error.message).toBe('Invalid client credentials');
    });

    test('@validation @C010 @AUTH-010 missing client_secret for client_credentials returns 400', async ({ authClient }) => {
        const response = await authClient.getToken({
            grant_type: 'client_credentials',
            client_id: 'demo-client',
        });

        expect(response.status).toBe(401);
        const body = ApiErrorResponseSchema.parse(response.data);

        expect(body.success).toBe(false);
        expect(body.error.code).toBe('INVALID_CLIENT');
        expect(body.error.message).toBe('Invalid client credentials');
    });


});