import { generateEmailWithLength, generateUniqueEmail } from '../../../helpers/testDataGenerator';

export const miniUserPositiveCases = [
    {
        name: '@smoke @regression @C001 @USER-001 should create mini user with required fields',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'New',
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    lastName: null,
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C002 @USER-002 should create mini user with all fields',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'Odoriko',
            lastName: 'Tokyo Drift'
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C003 @USER-003 should create mini user with special characters in name',
        payload: {
            email: generateUniqueEmail(),
            firstName: "O'Doriko",
            lastName: 'Tokyo-Drift',
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C004 @USER-004 should create mini user with unicode characters',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'Nguyễn',
            lastName: 'Hoàng',
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C005 @USER-005 should create mini user with null lastName',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'Odoriko',
            lastName: null,
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    lastName: null,
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C016 @USER-016 should create mini user with non-string firstName',
        payload: {
            email: generateUniqueEmail(),
            firstName: 12345,
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },
];

export const miniUserNegativeCases = [
    {
        name: '@regression @C006 @USER-006 should reject missing email',
        payload: {
            firstName: 'Odoriko',
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'REQUIRED',
                            message: 'email is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@regression @C007 @USER-007 should reject missing firstName',
        payload: {
            email: generateUniqueEmail(),
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'firstName',
                            code: 'REQUIRED',
                            message: 'firstName is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@regression @C008 @USER-008 should reject invalid email format',
        payload: {
            email: 'invalid-email',
            firstName: 'Odoriko',
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'INVALID_FORMAT',
                            message: 'email must be a valid email address',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@regression @C009 @USER-009 should reject empty email',
        payload: {
            email: '',
            firstName: 'Odoriko',
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'REQUIRED',
                            message: 'email is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@smoke @regression @C010 @USER-010 should reject duplicate email',
        payload: {
            email: 'newuser@example.com',
            firstName: 'Odoriko',
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 409,
            body: {
                success: false,
                error: {
                    code: 'CONFLICT',
                    message: 'A user with this email already exists',
                },
            },
        },
    },

    {
        name: '@regression @C011 @USER-011 should reject empty firstName',
        payload: {
            email: generateUniqueEmail(),
            firstName: '',
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'firstName',
                            code: 'REQUIRED',
                            message: 'firstName is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@regression @C012 @USER-012 should reject null email',
        payload: {
            email: null,
            firstName: 'Odoriko',
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'REQUIRED',
                            message: 'email is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@regression @C013 @USER-013 should reject null firstName',
        payload: {
            email: generateUniqueEmail(),
            firstName: null,
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'firstName',
                            code: 'REQUIRED',
                            message: 'firstName is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@regression @C014 @USER-014 should reject email exceeding maximum length',
        payload: {
            email: generateEmailWithLength(256),
            firstName: 'Odoriko',
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'MAX_LENGTH',
                            message: 'email must not exceed 255 characters',
                        },
                    ],
                },
            },
        },
        bug: 'BUG-EMAIL-MAX-LENGTH',
    },

    {
        name: '@regression @C015 @USER-015 should reject non-string email',
        payload: {
            email: 12345,
            firstName: 'Odoriko',
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'INVALID_FORMAT',
                            message: 'email must be a valid email address',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@regression @C017 @USER-017 should reject non-string lastName',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'Odoriko',
            lastName: 12345,
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'lastName',
                            code: 'INVALID_FORMAT',
                            message: 'lastName must be a string',
                        },
                    ],
                },
            },
        },
        bug: 'BUG-LASTNAME-INVALID-TYPE',
    },

    {
        name: '@regression @C018 @USER-018 should reject malformed JSON when firstName has no value',
        payload: `{
            "email": "newuser@example.com",
            "firstName": ,
            "lastName": "User"
        }`,
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'DATABASE_ERROR',
                    message: 'Failed to create user',
                },
            },
        },
        bug: 'BUG-MALFORMED-JSON-500',
    },
];