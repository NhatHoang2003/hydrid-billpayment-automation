import { test as base } from '@playwright/test';

import { AuthClient } from '../api/AuthClient';

type ApiFixtures = {
    authClient: AuthClient;
};

export const test = base.extend<ApiFixtures>({
    authClient: async ({ }, use) => {
        const authClient = new AuthClient();
        await use(authClient);
    },
});

export { expect } from '@playwright/test';