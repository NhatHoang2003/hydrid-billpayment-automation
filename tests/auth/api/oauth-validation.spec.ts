import { test, expect } from "../../../src/fixtures/apiFixture";
import { ApiErrorResponseSchema } from "../../../src/schemas/common.schemas";

test.describe('POST /oauth/token - OAuth2 Token Endpoint', () => {
    test('@validation @C016 @AUTH-016 unsupported Content-Type returns 400 bad request', async ({ authClient }) => {
        const response = await authClient.getToken(
            {
                grant_type: 'client_credentials',
                client_id: 'demo-client',
                client_secret: 'demo-secret-789',
            },
            {
                headers: {
                    'Content-Type': 'text/plain',
                },
            }
        );

        expect(response.status).toBe(400);

        const body = ApiErrorResponseSchema.parse(response.data);

        expect(body.success).toBe(false);
        expect(body.error.code).toBe('INVALID_CONTENT_TYPE');
        expect(body.error.message).toBe('Content-Type must be application/x-www-form-urlencoded or application/json');
        expect(body.error.traceId).toBeTruthy();
        expect(body.error.timestamp).toBeTruthy();
    });

    test('@validation @C017 @AUTH-017 omitted request body returns 400 bad request', async ({ authClient }) => {
        const response = await authClient.getToken();

        expect(response.status).toBe(400);

        const body = ApiErrorResponseSchema.parse(response.data);

        expect(body.success).toBe(false);
        expect(body.error.code).toBe('UNSUPPORTED_GRANT_TYPE');
        expect(body.error.message).toBe('Unsupported grant_type: undefined. Supported: client_credentials, password, refresh_token');
        expect(body.error.traceId).toBeTruthy()
        expect(body.error.timestamp).toBeTruthy();
    });

    test('@validation @C018 @AUTH-018 empty request body returns 400 bad request', async ({ authClient }) => {
        const response = await authClient.getToken({});

        expect(response.status).toBe(400);

        const body = ApiErrorResponseSchema.parse(response.data);

        expect(body.success).toBe(false);
        expect(body.error.code).toBe('UNSUPPORTED_GRANT_TYPE');
        expect(body.error.message).toBe('Unsupported grant_type: undefined. Supported: client_credentials, password, refresh_token');
        expect(body.error.traceId).toBeTruthy()
        expect(body.error.timestamp).toBeTruthy();
    });

})