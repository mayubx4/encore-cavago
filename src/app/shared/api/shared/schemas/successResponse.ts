import { Schema, ZodSchema, z } from 'zod';

export const successResponse = z.object({
  message: z.string(),
});

export const DataResponseSchema = <Schema extends ZodSchema>(objectSchema: Schema) => z.object({
  data: objectSchema,
}).transform(({ data }) => data);
