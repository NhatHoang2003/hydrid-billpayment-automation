# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: users\api\get-users.spec.ts >> GET /v1/users - List Users >> @regression @C014 @USER-GET-014 should reject non-numeric string page (page = "abc")
- Location: tests\users\api\get-users.spec.ts:26:13

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 500
```

# Test source

```ts
  1   | import { test, expect } from '../../../src/fixtures/apiFixture';
  2   | import { generalCases, pageCases, limitCases, kycStatusCases, searchCases } from '../../../src/data/api/users/get-users.cases';
  3   | import { ApiSuccessResponseSchema, ApiErrorResponseSchema } from '../../../src/schemas/common.schemas';
  4   | import { SchemaValidator } from '../../../src/helpers/schemaValidator';
  5   | import { ApiEvidence } from '../../../src/helpers/ApiEvidence';
  6   | 
  7   | test.describe('GET /v1/users - List Users', () => {
  8   | 
  9   |     for (const testCase of generalCases) {
  10  |         test(testCase.name, async ({ userClient }) => {
  11  |             const response = await userClient.getListUser(testCase.params);
  12  | 
  13  |             expect(response.status).toBe(testCase.expected.status);
  14  | 
  15  |             await SchemaValidator.validate(
  16  |                 ApiSuccessResponseSchema,
  17  |                 response.data,
  18  |                 'GET /v1/users - Success Response'
  19  |             );
  20  | 
  21  |             expect(response.data).toMatchObject(testCase.expected.body);
  22  |         });
  23  |     }
  24  | 
  25  |     for (const testCase of pageCases) {
  26  |         test(testCase.name, async ({ userClient }) => {
  27  | 
  28  |             // if ('bug' in testCase && testCase.bug) {
  29  |             //     test.fixme(
  30  |             //         true,
  31  |             //         `${testCase.bug}: Backend validation bug`
  32  |             //     );
  33  |             // }
  34  | 
  35  |             const response = await userClient.getListUser(testCase.params);
  36  | 
  37  |             await ApiEvidence.attach(
  38  |                 'GET /v1/users',
  39  |                 testCase.params,
  40  |                 response
  41  |             );
  42  | 
> 43  |             expect(response.status).toBe(testCase.expected.status);
      |                                     ^ Error: expect(received).toBe(expected) // Object.is equality
  44  | 
  45  |             if (response.status === 200) {
  46  |                 await SchemaValidator.validate(
  47  |                     ApiSuccessResponseSchema,
  48  |                     response.data,
  49  |                     'GET /v1/users - Success Response'
  50  |                 );
  51  |             } else {
  52  |                 await SchemaValidator.validate(
  53  |                     ApiErrorResponseSchema,
  54  |                     response.data,
  55  |                     'GET /v1/users - Error Response'
  56  |                 );
  57  |             }
  58  | 
  59  |             expect(response.data).toMatchObject(testCase.expected.body);
  60  |         });
  61  |     };
  62  | 
  63  |     test('@regression @C007 @USER-GET-007 should accept middle valid page', async ({ userClient }) => {
  64  |         const totalPages = (await userClient.getListUser({
  65  |             page: 1,
  66  |             limit: 10,
  67  |         })).data.meta.pagination.totalPages;
  68  | 
  69  |         const middlePage = Math.max(1, Math.ceil(totalPages / 2));
  70  | 
  71  |         const response = await userClient.getListUser({
  72  |             page: middlePage,
  73  |             limit: 10,
  74  |         });
  75  | 
  76  |         expect(response.status).toBe(200);
  77  | 
  78  |         await SchemaValidator.validate(
  79  |             ApiSuccessResponseSchema,
  80  |             response.data,
  81  |             'GET /v1/users - Success Response'
  82  |         );
  83  | 
  84  |         expect(response.data.meta.pagination).toMatchObject({
  85  |             page: middlePage,
  86  |             limit: 10,
  87  |             hasPrev: middlePage > 1,
  88  |             hasNext: middlePage < totalPages,
  89  |         });
  90  |     });
  91  | 
  92  | 
  93  |     test('@regression @C008 @USER-GET-008 should accept current max page', async ({ userClient }) => {
  94  |         const totalPages = (await userClient.getListUser({
  95  |             page: 1,
  96  |             limit: 10,
  97  |         })).data.meta.pagination.totalPages;
  98  | 
  99  |         const response = await userClient.getListUser({
  100 |             page: totalPages,
  101 |             limit: 10,
  102 |         });
  103 | 
  104 |         expect(response.status).toBe(200);
  105 | 
  106 |         await SchemaValidator.validate(
  107 |             ApiSuccessResponseSchema,
  108 |             response.data,
  109 |             'GET /v1/users - Success Response'
  110 |         );
  111 | 
  112 |         expect(response.data.meta.pagination).toMatchObject({
  113 |             page: totalPages,
  114 |             limit: 10,
  115 |             hasNext: false,
  116 |             hasPrev: totalPages > 1,
  117 |         });
  118 |     });
  119 | 
  120 | 
  121 |     test('@regression @C009 @USER-GET-009 should return empty data for page just exceeding totalPages', async ({ userClient }) => {
  122 |         const totalPages = (await userClient.getListUser({
  123 |             page: 1,
  124 |             limit: 10,
  125 |         })).data.meta.pagination.totalPages;
  126 | 
  127 |         const pageAfterLast = totalPages + 1;
  128 | 
  129 |         const response = await userClient.getListUser({
  130 |             page: pageAfterLast,
  131 |             limit: 10,
  132 |         });
  133 | 
  134 |         expect(response.status).toBe(200);
  135 | 
  136 |         await SchemaValidator.validate(
  137 |             ApiSuccessResponseSchema,
  138 |             response.data,
  139 |             'GET /v1/users - Success Response'
  140 |         );
  141 | 
  142 |         expect(response.data.data).toEqual([]);
  143 | 
```