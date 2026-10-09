# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: users\api\get-users.spec.ts >> GET /v1/users - List Users >> @regression @C028 @USER-GET-028 should reject limit exceeding integer bounds
- Location: tests\users\api\get-users.spec.ts:185:13

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 200
```

# Test source

```ts
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
  144 |         expect(response.data.meta.pagination).toMatchObject({
  145 |             page: pageAfterLast,
  146 |             limit: 10,
  147 |             hasNext: false,
  148 |             hasPrev: true,
  149 |         });
  150 |     });
  151 | 
  152 | 
  153 |     test('@regression @C010 @USER-GET-010 should return empty data for far out-of-bounds page', async ({ userClient }) => {
  154 |         const totalPages = (await userClient.getListUser({
  155 |             page: 1,
  156 |             limit: 10,
  157 |         })).data.meta.pagination.totalPages;
  158 | 
  159 |         const farPage = totalPages + 1000;
  160 | 
  161 |         const response = await userClient.getListUser({
  162 |             page: farPage,
  163 |             limit: 10,
  164 |         });
  165 | 
  166 |         expect(response.status).toBe(200);
  167 | 
  168 |         await SchemaValidator.validate(
  169 |             ApiSuccessResponseSchema,
  170 |             response.data,
  171 |             'GET /v1/users - Success Response'
  172 |         );
  173 | 
  174 |         expect(response.data.data).toEqual([]);
  175 | 
  176 |         expect(response.data.meta.pagination).toMatchObject({
  177 |             page: farPage,
  178 |             limit: 10,
  179 |             hasNext: false,
  180 |             hasPrev: true,
  181 |         });
  182 |     });
  183 | 
  184 |     for (const testCase of limitCases) {
  185 |         test(testCase.name, async ({ userClient }) => {
  186 | 
  187 |             const response = await userClient.getListUser(testCase.params);
  188 | 
  189 |             // console.log('baseURL:', response.config.baseURL);
  190 |             // console.log('url:', response.config.url);
  191 |             // console.log('params:', response.config.params);
  192 |             // console.log('final URL:', response.request?.res?.responseUrl);
  193 |             // console.log('status:', response.status);
  194 |             // console.log('body:', response.data);
  195 | 
  196 |             // if ('bug' in testCase && testCase.bug) {
  197 |             //     test.fixme(
  198 |             //         true,
  199 |             //         `${testCase.bug}: Backend validation bug`
  200 |             //     );
  201 |             // }
  202 | 
  203 |             await ApiEvidence.attach(
  204 |                 'GET /v1/users',
  205 |                 testCase.params,
  206 |                 response
  207 |             );
  208 | 
> 209 |             expect(response.status).toBe(testCase.expected.status);
      |                                     ^ Error: expect(received).toBe(expected) // Object.is equality
  210 | 
  211 |             if (response.status === 200) {
  212 |                 await SchemaValidator.validate(
  213 |                     ApiSuccessResponseSchema,
  214 |                     response.data,
  215 |                     'GET /v1/users - Success Response'
  216 |                 );
  217 |             } else {
  218 |                 await SchemaValidator.validate(
  219 |                     ApiErrorResponseSchema,
  220 |                     response.data,
  221 |                     'GET /v1/users - Error Response'
  222 |                 );
  223 |             }
  224 | 
  225 |             expect(response.data).toMatchObject(testCase.expected.body);
  226 |         });
  227 |     }
  228 | 
  229 |     for (const testCase of kycStatusCases) {
  230 |         test(testCase.name, async ({ userClient }) => {
  231 |             const response = await userClient.getListUser(testCase.params);
  232 | 
  233 |             // if ('bug' in testCase && testCase.bug) {
  234 |             //     test.fixme(
  235 |             //         true,
  236 |             //         `${testCase.bug}: Backend validation bug`
  237 |             //     );
  238 |             // }
  239 | 
  240 |             await ApiEvidence.attach(
  241 |                 'GET /v1/users',
  242 |                 testCase.params,
  243 |                 response
  244 |             );
  245 | 
  246 |             expect(response.status).toBe(testCase.expected.status);
  247 | 
  248 |             if (response.status === 200) {
  249 |                 await SchemaValidator.validate(
  250 |                     ApiSuccessResponseSchema,
  251 |                     response.data,
  252 |                     'GET /v1/users - Success Response'
  253 |                 );
  254 |             } else {
  255 |                 await SchemaValidator.validate(
  256 |                     ApiErrorResponseSchema,
  257 |                     response.data,
  258 |                     'GET /v1/users - Error Response'
  259 |                 );
  260 |             }
  261 | 
  262 |             expect(response.data).toMatchObject(testCase.expected.body);
  263 |         });
  264 |     }
  265 | 
  266 |     for (const testCase of searchCases) {
  267 |         test(testCase.name, async ({ userClient }) => {
  268 |             const response = await userClient.getListUser(testCase.params);
  269 | 
  270 |             // if ('bug' in testCase && testCase.bug) {
  271 |             //     test.fixme(
  272 |             //         true,
  273 |             //         `${testCase.bug}: Backend validation bug`
  274 |             //     );
  275 |             // }
  276 | 
  277 |             await ApiEvidence.attach(
  278 |                 'GET /v1/users',
  279 |                 testCase.params,
  280 |                 response
  281 |             );
  282 | 
  283 |             expect(response.status).toBe(testCase.expected.status);
  284 | 
  285 |             if (response.status === 200) {
  286 |                 await SchemaValidator.validate(
  287 |                     ApiSuccessResponseSchema,
  288 |                     response.data,
  289 |                     'GET /v1/users - Success Response'
  290 |                 );
  291 |             } else {
  292 |                 await SchemaValidator.validate(
  293 |                     ApiErrorResponseSchema,
  294 |                     response.data,
  295 |                     'GET /v1/users - Error Response'
  296 |                 );
  297 |             }
  298 | 
  299 |             expect(response.data).toMatchObject(testCase.expected.body);
  300 |         });
  301 |     };
  302 | 
  303 |     test('@regression @C043 @USER-GET-043 should find user by full phone number',
  304 |         async ({ userClient }) => {
  305 | 
  306 |             const listResponse = await userClient.getListUser({
  307 |                 page: 1,
  308 |                 limit: 1,
  309 |             });
```