import { test } from '@playwright/test';
import { z } from 'zod';

export class SchemaValidator {
    static async validate<T extends z.ZodType>(
        schema: T,
        data: unknown,
        schemaName: string
    ): Promise<z.output<T>> {

        return test.step(
            `Validate Schema: ${schemaName}`,
            async (): Promise<z.output<T>> => {

                const result = schema.safeParse(data);

                if (!result.success) {
                    await test.info().attach(
                        'Schema Validation Errors',
                        {
                            body: JSON.stringify(
                                result.error.issues,
                                null,
                                2
                            ),
                            contentType: 'application/json'
                        }
                    );

                    throw result.error;
                }

                return result.data;
            }
        );
    }
}