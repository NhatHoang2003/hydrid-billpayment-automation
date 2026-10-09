import { miniUserNegativeCases, miniUserPositiveCases } from "../../../src/data/api/users/create-user-cases";
import { expect, test } from "../../../src/fixtures/apiFixture";
import { ApiErrorResponseSchema, ApiSuccessResponseSchema } from "../../../src/schemas/common.schemas";

test.describe('POST /v1/users - Create User', () => {

    let createdUserId: string | undefined;

    test.afterEach(async ({ userClient }) => {
        if (createdUserId) {
            await userClient.deleteUser(createdUserId);
            createdUserId = undefined;
        }
    });


    for (const testCase of miniUserPositiveCases) {

        test(testCase.name, async ({ userClient }) => {

            const payload = testCase.payload;

            const response = await userClient.postUser(payload);

            expect(response.status).toBe(testCase.expected.status);

            ApiSuccessResponseSchema.parse(response.data);

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    };

    for (const testCase of miniUserNegativeCases) {

        test(testCase.name, async ({ userClient }) => {

            if (testCase.bug) {
                test.fixme(
                    true,
                    'BUG-BACKEND: Server missing validation (returns 200) or crashes (returns 500) on invalid page input'
                );
            }

            const payload = testCase.payload;

            const response = await userClient.postUser(payload);

            expect(response.status).toBe(testCase.expected.status);

            ApiErrorResponseSchema.parse(response.data);

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    };
});
