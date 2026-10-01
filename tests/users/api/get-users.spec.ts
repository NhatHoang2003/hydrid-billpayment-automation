import { test, expect } from '../../../src/fixtures/apiFixture';
import { generalCases, pageCases, limitCases, kycStatusCases, searchCases } from '../../../src/data/api/users/get-users.cases';
import { ApiSuccessResponseSchema, ApiErrorResponseSchema } from '../../../src/schemas/common.schemas';

test.describe('GET /v1/users - List Users', () => {

    for (const testCase of generalCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.getListUser(testCase.params);

            expect(response.status).toBe(testCase.expected.status);

            ApiSuccessResponseSchema.parse(response.data);

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    for (const testCase of pageCases) {
        test(testCase.name, async ({ userClient }) => {

            if ('bug' in testCase && testCase.bug) {
                test.fixme(
                    true,
                    `${testCase.bug}: Backend page validation bug`
                );
            }

            const response = await userClient.getListUser(testCase.params);

            expect(response.status).toBe(testCase.expected.status);

            if (response.status === 200) {
                ApiSuccessResponseSchema.parse(response.data);
            } else {
                ApiErrorResponseSchema.parse(response.data);
            }

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    test('@regression @C008 @USER-GET-008 should accept current max page', async ({ userClient }) => {
        const firstResponse = await userClient.getListUser({
            page: 1,
            limit: 10,
        });

        expect(firstResponse.status).toBe(200);

        ApiSuccessResponseSchema.parse(firstResponse.data);

        const totalPages = firstResponse.data.meta.pagination.totalPages;

        const response = await userClient.getListUser({
            page: totalPages,
            limit: 10,
        });

        expect(response.status).toBe(200);

        ApiSuccessResponseSchema.parse(response.data);

        expect(response.data.meta.pagination).toMatchObject({
            page: totalPages,
            limit: 10,
            hasNext: false,
            hasPrev: totalPages > 1,
        });
    });


    test('@regression @C009 @USER-GET-009 should return empty data for page just exceeding totalPages', async ({ userClient }) => {
        const firstResponse = await userClient.getListUser({
            page: 1,
            limit: 10,
        });

        expect(firstResponse.status).toBe(200);

        ApiSuccessResponseSchema.parse(firstResponse.data);

        const totalPages = firstResponse.data.meta.pagination.totalPages;

        const pageAfterLast = totalPages + 1;

        const response = await userClient.getListUser({
            page: pageAfterLast,
            limit: 10,
        });

        expect(response.status).toBe(200);

        ApiSuccessResponseSchema.parse(response.data);

        expect(response.data.data).toEqual([]);

        expect(response.data.meta.pagination).toMatchObject({
            page: pageAfterLast,
            limit: 10,
            hasNext: false,
            hasPrev: true,
        });
    });


    test('@regression @C010 @USER-GET-010 should return empty data for far out-of-bounds page', async ({ userClient }) => {
        const firstResponse = await userClient.getListUser({
            page: 1,
            limit: 10,
        });

        expect(firstResponse.status).toBe(200);

        ApiSuccessResponseSchema.parse(firstResponse.data);

        const totalPages = firstResponse.data.meta.pagination.totalPages;

        const farPage = totalPages + 1000;

        const response = await userClient.getListUser({
            page: farPage,
            limit: 10,
        });

        expect(response.status).toBe(200);

        ApiSuccessResponseSchema.parse(response.data);

        expect(response.data.data).toEqual([]);

        expect(response.data.meta.pagination).toMatchObject({
            page: farPage,
            limit: 10,
            hasNext: false,
            hasPrev: true,
        });
    }
    );

    for (const testCase of limitCases) {
        test(testCase.name, async ({ userClient }) => {

            const response = await userClient.getListUser(testCase.params);

            // console.log('baseURL:', response.config.baseURL);
            // console.log('url:', response.config.url);
            // console.log('params:', response.config.params);
            // console.log('final URL:', response.request?.res?.responseUrl);
            // console.log('status:', response.status);
            // console.log('body:', response.data);

            if ('bug' in testCase && testCase.bug) {
                test.fixme(
                    true,
                    `${testCase.bug}: Backend page validation bug`
                );
            }

            expect(response.status).toBe(testCase.expected.status);

            if (response.status === 200) {
                ApiSuccessResponseSchema.parse(response.data);
            } else {
                ApiErrorResponseSchema.parse(response.data);
            }

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    for (const testCase of kycStatusCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.getListUser(testCase.params);

            if ('bug' in testCase && testCase.bug) {
                test.fixme(
                    true,
                    `${testCase.bug}: Backend page validation bug`
                );
            }

            expect(response.status).toBe(testCase.expected.status);

            if (response.status === 200) {
                ApiSuccessResponseSchema.parse(response.data);
            } else {
                ApiErrorResponseSchema.parse(response.data);
            }

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    for (const testCase of searchCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.getListUser(testCase.params);

            expect(response.status).toBe(testCase.expected.status);

            if (response.status === 200) {
                ApiSuccessResponseSchema.parse(response.data);
            } else {
                ApiErrorResponseSchema.parse(response.data);
            }

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    };

    test('@regression @C043 @USER-GET-043 should find user by full phone number',
        async ({ userClient }) => {

            const phone = '+84394267205';

            const response = await userClient.getListUser({
                search: phone,
            });

            expect(response.status).toBe(200);

            ApiSuccessResponseSchema.parse(response.data);

            const users = response.data.data;

            expect(users.length).toBeGreaterThan(0);

            for (const user of users) {
                expect(user.phone).toBe(phone);
            }
        }
    );

    test('@regression @C048 @USER-GET-048 middle page: hasNext = true, hasPrev = true', async ({ userClient }) => {
        const response = await userClient.getListUser({
            page: 2,
            limit: 10,
        });

        expect(response.status).toBe(200);

        ApiSuccessResponseSchema.parse(response.data);

        const pagination = response.data.meta.pagination;

        expect(pagination.page).toBe(2);
        expect(pagination.limit).toBe(10);
        expect(pagination.hasPrev).toBe(true);

        expect(pagination.hasNext).toBe(
            pagination.page < pagination.totalPages
        );
    });

    test('@regression @C049 @USER-GET-049 returned items count does not exceed requested limit', async ({ userClient }) => {
        const limit = 5;

        const response = await userClient.getListUser({
            page: 1,
            limit,
        });

        expect(response.status).toBe(200);

        ApiSuccessResponseSchema.parse(response.data);

        expect(response.data.meta.pagination.limit).toBe(limit);

        expect(response.data.data.length).toBeLessThanOrEqual(limit);
    });

    test('@regression @C050 @USER-GET-050 verify totalPages calculation formula (ceil(total/limit))', async ({ userClient }) => {

        const limit = 7;

        const response = await userClient.getListUser({
            page: 1,
            limit,
        });

        expect(response.status).toBe(200);

        ApiSuccessResponseSchema.parse(response.data);

        const pagination = response.data.meta.pagination;

        expect(pagination.limit).toBe(limit);

        expect(pagination.totalPages).toBe(Math.ceil(pagination.total / pagination.limit));
    });


    test('@regression @C051 @USER-GET-051 verify root response structure (success, data, meta)', async ({ userClient }) => {
        const response = await userClient.getListUser();

        expect(response.status).toBe(200);

        ApiSuccessResponseSchema.parse(response.data);

        expect(response.data).toEqual(
            expect.objectContaining({
                success: true,
                data: expect.any(Array),
                meta: expect.any(Object),
            })
        );
    });


    test('@regression @C052 @USER-GET-052 ignore unknown params parameters gracefully', async ({ userClient }) => {
        const response = await userClient.getListUser({
            unknown_param: 'hack',
        });

        expect(response.status).toBe(200);

        ApiSuccessResponseSchema.parse(response.data);

        expect(response.data.success).toBe(true);
    });
});