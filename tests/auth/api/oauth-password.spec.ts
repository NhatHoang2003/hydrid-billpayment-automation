import { expect, test } from "../../../src/fixtures/apiFixture";
import { TokenResponseSchema } from "../../../src/schemas/auth.schemas";
import { ApiErrorResponseSchema, ApiSuccessResponseSchema } from "../../../src/schemas/common.schemas";


test.describe('POST /oauth/token - OAuth2 Token Endpoint', () => {
    test('@smoke @C002 @AUTH-002 valid password grant returns access token', async ({ authClient }) => {
        const response = await authClient.getToken({
            grant_type: 'password',
            username: 'demo',
            password: 'password123',
        });

        expect(response.status).toBe(200);

        const body = TokenResponseSchema.parse(response.data);

        expect(body.access_token).toBeTruthy();
        expect(body.token_type).toBe('Bearer');
        expect(body.expires_in).toBe(3600);
    });

    test('@security @C005 @AUTH-005 invalid username for password grant returns 401', async ({ authClient }) => {
        const response = await authClient.getToken({
            grant_type: 'password',
            username: 'wrong-user',
            password: 'password123',
        });

        expect(response.status).toBe(401);

        const body = ApiErrorResponseSchema.parse(response.data);

        expect(body.success).toBe(false);
        expect(body.error.code).toBe('INVALID_GRANT');
        expect(body.error.message).toBe('Invalid username or password');
    });

    test('@security @C006 @AUTH-006 invalid password for password grant returns 401', async ({ authClient }) => {
        const response = await authClient.getToken({
            grant_type: 'password',
            username: 'demo',
            password: 'wrong-password',
        });

        expect(response.status).toBe(401);

        const body = ApiErrorResponseSchema.parse(response.data);

        expect(body.success).toBe(false);
        expect(body.error.code).toBe('INVALID_GRANT');
        expect(body.error.message).toBe('Invalid username or password');

    });

    test('@validation @C011 @AUTH-011 missing username for password grant returns 401', async ({ authClient }) => {
        const response = await authClient.getToken({
            grant_type: 'password',
            password: 'password123',
        });

        expect(response.status).toBe(401);

        const body = ApiErrorResponseSchema.parse(response.data);

        expect(body.success).toBe(false);
        expect(body.error.code).toBe('INVALID_GRANT');
        expect(body.error.message).toBe('Invalid username or password');
    });

    test('@validation @C012 @AUTH-012 missing password for password grant returns 400', async ({ authClient }) => {
        const response = await authClient.getToken({
            grant_type: 'password',
            username: 'demo',
        });

        expect(response.status).toBe(401);

        const body = ApiErrorResponseSchema.parse(response.data);

        expect(body.success).toBe(false);
        expect(body.error.code).toBe('INVALID_GRANT');
        expect(body.error.message).toBe('Invalid username or password');
    });
});