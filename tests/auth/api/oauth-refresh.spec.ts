import { expect, test } from "../../../src/fixtures/apiFixture";
import { ApiErrorResponseSchema } from "../../../src/schemas/common.schemas";
import { TokenResponseSchema } from "../../../src/schemas/auth.schemas";


test.describe('POST /oauth/token - OAuth2 Token Endpoint', () => {

    test('@security @C014 @AUTH-014 valid refresh_token returns access token', async ({ authClient }) => {
        const passwordResponse = await authClient.getToken({
            grant_type: 'password',
            username: 'demo',
            password: 'password123',
        });

        expect(passwordResponse.status).toBe(200);

        const passwordBody = TokenResponseSchema.parse(passwordResponse.data);

        const refreshToken = passwordBody.refresh_token

        expect(refreshToken).toBeTruthy();

        const refreshResponse = await authClient.getToken({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });

        expect(refreshResponse.status).toBe(200);

        const refreshBody = TokenResponseSchema.parse(refreshResponse.data);

        expect(refreshBody.access_token).toBeTruthy();
        expect(refreshBody.token_type).toBe('Bearer');
        expect(refreshBody.expires_in).toBe(3600);
        expect(refreshBody.refresh_token).toBeTruthy();

    });

    test('@security @C015 @AUTH-015 invalid refresh_token returns 401 unauthorized', async ({ authClient }) => {
        const response = await authClient.getToken({
            grant_type: 'refresh_token',
            refresh_token: 'invalid-refresh-token',
        });

        expect(response.status).toBe(401);

        const body = ApiErrorResponseSchema.parse(response.data);

        expect(body.success).toBe(false);
        expect(body.error.code).toBe('INVALID_GRANT');
        expect(body.error.message).toBe('Invalid refresh token');
    });

})