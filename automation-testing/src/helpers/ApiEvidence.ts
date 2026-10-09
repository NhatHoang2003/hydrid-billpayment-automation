import { test } from '@playwright/test';

export class ApiEvidence {
    static async attach(
        endpoint: string,
        params: unknown,
        response: {
            status: number;
            data: unknown;
        }
    ): Promise<void> {
        const testCaseId = test.info().title
            .match(/@([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-\d{3,})\b/g)
            ?.map(tag => tag.slice(1))
            .find(id => !/^C\d+$/.test(id));

        if (!testCaseId) {
            throw new Error('Test Case ID not found in test title');
        }

        await test.info().attach(
            `${testCaseId}-api-evidence.json`,
            {
                body: JSON.stringify({
                    testCaseId,
                    endpoint,
                    params,
                    status: response.status,
                    responseBody: response.data,
                }, null, 2),
                contentType: 'application/json',
            }
        );
    }
}