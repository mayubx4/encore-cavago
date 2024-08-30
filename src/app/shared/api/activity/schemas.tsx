import { z } from 'zod';
import { ActivitySchema } from '../home/schemas';

export const ActivityRatingSchema = z.object({
  rating: z.number(),
  review_count: z.number(),
});

export const MoreActivitiesSchema = z.object({
  data: ActivitySchema.array().nullish(),
});
