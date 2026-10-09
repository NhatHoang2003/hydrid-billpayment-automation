import { z } from 'zod';

export const ApiErrorDetailSchema = z.object({
    field: z.string().optional(),
    message: z.string(),
    code: z.string().optional(),
});

export const ApiErrorResponseSchema = z.object({
    success: z.literal(false),
    error: z.object({
        code: z.string(),
        message: z.string(),
        traceId: z.string(),
        timestamp: z.string().datetime(),
        details: z.array(ApiErrorDetailSchema).optional(),
    }),
});

export const PaginationSchema = z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
    offset: z.number(),
    nextCursor: z.string().nullable().optional(),
    prevCursor: z.string().nullable().optional(),
});

export const ResponseMetaSchema = z.object({
    requestId: z.string(),
    timestamp: z.string(),
    version: z.string(),
    pagination: PaginationSchema.optional(),
});

export const ApiSuccessResponseSchema = z.object({
    success: z.literal(true),
    data: z.any(),
    meta: ResponseMetaSchema,
});