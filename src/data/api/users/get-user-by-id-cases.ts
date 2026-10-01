// =========================================================
// 1. POSITIVE CASES (USER ID)
// =========================================================

export const userIdPositiveCases = [
    {
        name: '@smoke @C101 @USER-ID-001 should get user with valid existing userId',
        query: {
            userId: 'user-1986eb1c',
        },
        expected: {
            status: 200,
            body: {
                success: true,
                data: {
                    id: 'user-1986eb1c',
                    email: 'test-user.0kcpna@example.com',
                    phone: '+84394267205',
                    firstName: 'Odoriko',
                    lastName: 'Lê',
                    kycStatus: 'pending',
                    address: {
                        line1: 'Lái Thiêu',
                        line2: null,
                        city: 'Bình Dương',
                        state: 'jjj',
                        postalCode: '700000',
                        country: 'IN',
                    },
                    createdAt: '2026-09-05T08:39:32.971Z',
                    updatedAt: '2026-09-05T09:05:12.958Z',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },
];

// =========================================================
// 2. NEGATIVE CASES (USER ID)
// =========================================================

export const userIdNegativeCases = [
    {
        name: '@regression @C102 @USER-ID-002 should return 404 for non-existing userId',
        query: {
            userId: 'usr_nonexistent123',
        },
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID 'usr_nonexistent123' not found",
                },
            },
        },
    },

    {
        name: '@regression @C103 @USER-ID-003 should reject empty userId',
        query: {
            userId: '',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'User ID cannot be empty',
                },
            },
        },
        bug: 'BUG-MISSING-INPUT-VALIDATION-200',
    },

    {
        name: '@regression @C104 @USER-ID-004 should reject whitespace-only userId',
        query: {
            userId: '    ',
        },
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID '%20%20%20' not found",
                },
            },
        },
    },

    {
        name: '@regression @C105 @USER-ID-005 should reject userId containing spaces',
        query: {
            userId: 'usr abc123',
        },
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID 'usr%20abc123' not found",
                },
            },
        },
    },

    {
        name: '@regression @C106 @USER-ID-006 should reject userId with special characters',
        query: {
            userId: '@#$% ',
        },
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID '%40%23%24%25' not found",
                },
            },
        },
    },

    {
        name: '@regression @C107 @USER-ID-007 should reject userId with invalid format',
        query: {
            userId: 'invalid-user-id',
        },
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID 'invalid-user-id' not found",
                },
            },
        },
    },
];

// =========================================================
// 3. EDGE CASES (USER ID)
// =========================================================

export const userIdEdgeCases = [
    {
        name: '@regression @C108 @USER-ID-008 should handle userId with leading whitespace',
        query: {
            userId: ' usr_abc123',
        },
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID '%20usr_abc123' not found",
                },
            },
        },
    },

    {
        name: '@regression @C109 @USER-ID-009 should handle userId with trailing whitespace',
        query: {
            userId: 'usr_abc123 ',
        },
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID 'usr_abc123%20' not found",
                },
            },
        },
    },

    {
        name: '@regression @C110 @USER-ID-010 should handle very long userId',
        query: {
            userId: 'a'.repeat(256),
        },
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: `User with ID '${'a'.repeat(256)}' not found`,
                },
            },
        },
    },

    {
        name: '@regression @C111 @USER-ID-011 should handle userId with Unicode characters',
        query: {
            userId: 'usr_用户123',
        },
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID 'usr_%E7%94%A8%E6%88%B7123' not found",
                },
            },
        },
    },
];