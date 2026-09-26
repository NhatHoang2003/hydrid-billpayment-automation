import { z } from 'zod';

export const UserResponseSchema = z.object({
    success: z.literal(true),
    data: z.object({
        id: z.string(),
        email: z.string(),
        phone: z.string().nullable(),
        firstName: z.string(),
        lastName: z.string().nullable(),
        kycStatus: z.string(),
        address: z.object({
            line1: z.string(),
            line2: z.string().nullable().optional(),
            city: z.string().optional(),
            state: z.string().optional(),
            postalCode: z.string().optional(),
            country: z.string().optional(),
        }).optional(),
        createdAt: z.string(),
        updatedAt: z.string(),
    }),
    meta: z.object({
        requestId: z.string(),
        timestamp: z.string(),
        version: z.string(),
    }),
});


export const UserListResponseSchema = z.object({
    success: z.literal(true),
    data: z.array(z.object({
        id: z.string(),
        email: z.string(),
        phone: z.string().nullable(),
        firstName: z.string(),
        lastName: z.string().nullable(),
        kycStatus: z.string(),
        address: z.object({
            line1: z.string(),
            line2: z.string().nullable().optional(),
            city: z.string().optional(),
            state: z.string().optional(),
            postalCode: z.string().optional(),
            country: z.string().optional(),
        }).optional(),
        createdAt: z.string(),
        updatedAt: z.string(),
    })),
    meta: z.object({
        requestId: z.string(),
        timestamp: z.string(),
        version: z.string(),
        pagination: z.object({
            page: z.number(),
            limit: z.number(),
            total: z.number(),
            totalPages: z.number(),
            hasNext: z.boolean(),
            hasPrev: z.boolean(),
            offset: z.number(),
        }),
    }),
});