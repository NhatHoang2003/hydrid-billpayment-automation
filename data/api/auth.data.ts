export const positiveCases = [
    {
        title: '@smoke @C001 @AUTH-001 valid client_credentials grant returns access token',
        payload: {
            grant_type: 'client_credentials',
            client_id: 'demo-client',
            client_secret: 'demo-secret-789',
        },
        expectedStatus: 200,
    },
    {
        title: '@smoke @C002 @AUTH-002 valid password grant returns access token',
        payload: {
            grant_type: 'password',
            client_id: 'demo-client',
            client_secret: 'demo-secret-789',
            username: 'demo',
            password: 'password123',
        },
        expectedStatus: 200,
    },
    {
        title: '@regression @C013 @AUTH-013 valid refresh_token grant returns access token',
        payload: {
            grant_type: 'refresh_token',
            refresh_token: '',
        },
        expectedStatus: 200,
    },
];

export const validationCases = [
    {
        title: '@security @C003 @AUTH-003 invalid client_id returns 401 unauthorized',
        payload: {
            grant_type: 'client_credentials',
            client_id: 'wrong-client',
            client_secret: 'demo-secret-789',
        },
        expectedStatus: 401,
    },
    {
        title: '@security @C004 @AUTH-004 invalid client_secret returns 401 unauthorized',
        payload: {
            grant_type: 'client_credentials',
            client_id: 'demo-client',
            client_secret: 'wrong-secret',
        },
        expectedStatus: 401,
    },
    {
        title: '@security @C005 @AUTH-005 invalid username for password grant returns 401',
        payload: {
            grant_type: 'password',
            client_id: 'demo-client',
            client_secret: 'demo-secret-789',
            username: 'wrong-user',
            password: 'password123',
        },
        expectedStatus: 401,
    },
    {
        title: '@security @C006 @AUTH-006 invalid password for password grant returns 401',
        payload: {
            grant_type: 'password',
            client_id: 'demo-client',
            client_secret: 'demo-secret-789',
            username: 'demo',
            password: 'wrong-password',
        },
        expectedStatus: 401,
    },
    {
        title: '@validation @C007 @AUTH-007 missing grant_type returns 400 bad request',
        payload: {
            client_id: 'demo-client',
            client_secret: 'demo-secret-789',
        },
        expectedStatus: 400,
    },
    {
        title: '@validation @C008 @AUTH-008 unsupported grant_type returns 400 bad request',
        payload: {
            grant_type: 'invalid_grant',
            client_id: 'demo-client',
            client_secret: 'demo-secret-789',
        },
        expectedStatus: 400,
    },
    {
        title: '@security @C014 @AUTH-014 invalid refresh_token returns 401 unauthorized',
        payload: {
            grant_type: 'refresh_token',
            refresh_token: 'invalid-refresh-token',
        },
        expectedStatus: 401,
    },
];

export const negativeCase = [
    {
        title: '@validation @C009 @AUTH-009 missing client_id for client_credentials returns 400',
        payload: {
            grant_type: 'client_credentials',
            client_secret: 'demo-secret-789',
        },
        expectedStatus: 400,
    },
    {
        title: '@validation @C010 @AUTH-010 missing client_secret for client_credentials returns 400',
        payload: {
            grant_type: 'client_credentials',
            client_id: 'demo-client',
        },
        expectedStatus: 400,
    },
    {
        title: '@validation @C011 @AUTH-011 missing username for password grant returns 400',
        payload: {
            grant_type: 'password',
            client_id: 'demo-client',
            client_secret: 'demo-secret-789',
            password: 'password123',
        },
        expectedStatus: 400,
    },
    {
        title: '@validation @C012 @AUTH-012 missing password for password grant returns 400',
        payload: {
            grant_type: 'password',
            client_id: 'demo-client',
            client_secret: 'demo-secret-789',
            username: 'demo',
        },
        expectedStatus: 400,
    },
    {
        title: '@validation @C015 @AUTH-015 empty request body returns 400 bad request',
        payload: {},
        expectedStatus: 400,
    },
    {
        title: '@validation @C016 @AUTH-016 unsupported Content-Type returns 400 bad request',
        payload: {
            grant_type: 'client_credentials',
            client_id: 'demo-client',
            client_secret: 'demo-secret-789',
        },
        headers: {
            'Content-Type': 'text/plain',
        },
        expectedStatus: 400,
    },
    {
        title: '@validation @C017 @AUTH-017 omitted request body returns 400 bad request',
        payload: undefined,
        expectedStatus: 400,
    },
];