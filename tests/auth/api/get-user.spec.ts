import { test, expect } from '@playwright/test';
import { AuthClient } from '../../../src/api/AuthClient';

test.describe('Authentication API', () => {
    test('@smoke @C001 @AUTH-001 valid API Key returns current user', async () => {
        const authClient = new AuthClient();

        const response = await authClient.getCurrentUser();

        expect(response.status).toBe(200);
        expect(response.data).toBeDefined();
    });
});