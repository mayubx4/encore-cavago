import { z } from 'zod';
import { ActivitySchema } from '../home/schemas';

export const WishlistSchema = z.object({
  activity_details: ActivitySchema,
  facility_id: z.number(),
  id: z.number(),
  item_id: z.number(),
  item_type: z.number(),
  note: z.string().nullish(),
  status: z.number(),
  user_id: z.number(),
});

export const ToggleFvrtSchema = z.object({
  item_id: z.string().or(z.number()),
}).or(z.string());
