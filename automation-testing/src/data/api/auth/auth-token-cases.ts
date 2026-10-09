export const invalidClientCases = [
    {
        id: 'C003',
        testCaseId: 'AUTH-003',
        tag: '@security',
        name: 'should return 401 when client_id is invalid',
        payload: {
            grant_type: 'client_credentials',
            client_id: 'wrong-client',
            client_secret: 'demo-secret-789',
        },
    },
    {
        id: 'C004',
        testCaseId: 'AUTH-004',
        tag: '@security',
        name: 'should return 401 when client_secret is invalid',
        payload: {
            grant_type: 'client_credentials',
            client_id: 'demo-client',
            client_secret: 'wrong-secret',
        },
    },
    {
        id: 'C009',
        testCaseId: 'AUTH-009',
        tag: '@validation',
        name: 'should return 401 when client_id is missing',
        payload: {
            grant_type: 'client_credentials',
            client_secret: 'demo-secret-789',
        },
    },
    {
        id: 'C010',
        testCaseId: 'AUTH-010',
        tag: '@validation',
        name: 'should return 401 when client_secret is missing',
        payload: {
            grant_type: 'client_credentials',
            client_id: 'demo-client',
        },
    },
    {
        id: 'C019',
        testCaseId: 'AUTH-019',
        tag: '@validation',
        name: 'should return 401 when client_id is empty',
        payload: {
            grant_type: 'client_credentials',
            client_id: '',
            client_secret: 'demo-secret-789',
        },
    },
    {
        id: 'C020',
        testCaseId: 'AUTH-020',
        tag: '@validation',
        name: 'should return 401 when client_secret is empty',
        payload: {
            grant_type: 'client_credentials',
            client_id: 'demo-client',
            client_secret: '',
        },
    },
    {
        id: 'C021',
        testCaseId: 'AUTH-021',
        tag: '@validation',
        name: 'should return 401 when client_id is a number',
        payload: {
            grant_type: 'client_credentials',
            client_id: 12345,
            client_secret: 'demo-secret-789',
        },
    },
    {
        id: 'C022',
        testCaseId: 'AUTH-022',
        tag: '@validation',
        name: 'should return 401 when client_secret is a number',
        payload: {
            grant_type: 'client_credentials',
            client_id: 'demo-client',
            client_secret: 12345,
        },
    },
];

export const invalidPasswordCases = [
    {
        id: 'AUTH-005',
        tag: '@security',
        name: 'should return 401 when username is invalid',
        payload: {
            grant_type: 'password',
            username: 'wrong-user',
            password: 'password123',
        },
    },
    {
        id: 'AUTH-006',
        tag: '@security',
        name: 'should return 401 when password is invalid',
        payload: {
            grant_type: 'password',
            username: 'demo',
            password: 'wrong-password',
        },
    },
    {
        id: 'AUTH-011',
        tag: '@validation',
        name: 'should return 401 when username is missing',
        payload: {
            grant_type: 'password',
            password: 'password123',
        },
    },
    {
        id: 'AUTH-012',
        tag: '@validation',
        name: 'should return 401 when password is missing',
        payload: {
            grant_type: 'password',
            username: 'demo',
        },
    },
];