export const userIdPositiveCases = [
    {
        name: '@smoke @C001 @USER-GET-BY-ID-001 should get user with valid existing userId',

        query: {
            userId: 'user-848683c7',
        },

        expected: {
            status: 200,

            body: {
                success: true,

                data: {
                    id: 'user-848683c7',
                    email: 'test-user.lcfief@example.com',
                    phone: '+84394267205',
                    firstName: 'Odoriko',
                    lastName: 'Tokyo Drift',
                    kycStatus: 'pending',
                    address: {
                        line1: 'Lái Thiêu',
                        line2: null,
                        city: 'Bình Dương',
                        state: null,
                        postalCode: '700000',
                        country: 'IN',
                    },
                    createdAt: '2026-09-11T06:32:10.329Z',
                    updatedAt: '2026-09-11T06:39:44.310Z',
                },

                meta: {
                    version: 'v1',
                },
            },
        },
    },
];

export const userIdNegativeCases = [
    {
        name: '@regression @C002 @USER-GET-BY-ID-002 should return 404 for non-existing userId',
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
        name: '@regression @C003 @USER-GET-BY-ID-003 should reject empty userId',

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
        name: '@regression @C004 @USER-GET-BY-ID-004 should reject whitespace-only userId',

        query: {
            userId: '   ',
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
        name: '@regression @C005 @USER-GET-BY-ID-005 should reject userId containing spaces',

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
        name: '@regression @C006 @USER-GET-BY-ID-006 should reject userId with special characters',

        query: {
            userId: '@#$%',
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
        name: '@regression @C007 @USER-GET-BY-ID-007 should reject userId with invalid format',

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

    {
        name: '@regression @C008 @USER-GET-BY-ID-008 should reject missing userId parameter (empty query object)',
        query: {},
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'User ID is required',
                },
            },
        },
    },

    {
        name: '@regression @C009 @USER-GET-BY-ID-009 should reject numeric userId instead of string',
        query: {
            userId: 123456,
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'User ID must be a string',
                },
            },
        },
    },

    {
        name: '@regression @C010 @USER-GET-BY-ID-010 should reject null userId',
        query: {
            userId: null,
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'User ID cannot be null',
                },
            },
        },
    },

    {
        name: '@regression @C011 @USER-GET-BY-ID-011 should reject boolean userId',
        query: {
            userId: true,
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'User ID must be a string',
                },
            },
        },
    },

    {
        name: '@regression @C012 @USER-GET-BY-ID-012 should reject object userId (malformed payload)',
        query: {
            userId: { id: 'user-848683c7' },
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'User ID must be a string',
                },
            },
        },
    },

    {
        name: '@security @C013 @USER-GET-BY-ID-013 should handle potential SQL/NoSQL injection payload safely',
        query: {
            userId: "' OR '1'='1",
        },
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID '%27%20OR%20%271%27%3D%271' not found",
                },
            },
        },
    },

    {
        name: '@security @C014 @USER-GET-BY-ID-014 should handle path traversal payload safely',
        query: {
            userId: '../../etc/passwd',
        },
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID '..%2F..%2Fetc%2Fpasswd' not found",
                },
            },
        },
    },
];

export const userIdEdgeCases = [
    {
        name: '@edge @C015 @USER-GET-BY-ID-015 should handle userId with leading whitespace',

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
        name: '@edge @C016 @USER-GET-BY-ID-016 should handle userId with trailing whitespace',

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
        name: '@edge @C017 @USER-GET-BY-ID-017 should handle very long userId',

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
        name: '@edge @C018 @USER-GET-BY-ID-018 should handle userId with Unicode characters',

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