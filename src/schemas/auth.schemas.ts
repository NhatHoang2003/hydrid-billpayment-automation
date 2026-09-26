import { create } from 'domain';
import { z } from 'zod';

export const TokenResponseSchema = z.object({
    access_token: z.string(),
    token_type: z.string(),
    expires_in: z.number(),
    refresh_token: z.string().optional(),
    scope: z.string(),
    create_At: z.number().optional(),
});