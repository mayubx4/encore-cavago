import { z } from 'zod';

export const ApplyPromoCodeSchema = z.object({
  voucher_id: z.number(),
  sub_total: z.number(),
  discounted_amount: z.number(),
  discounted_percentage: z.number(),
  vat: z.number(),
  add_on: z.number(),
  grand_total: z.number(),
});

export const CreateSessionSchema = z.object({
  line_items: z.array(
    z.object({
      name: z.string(),
      description: z.string().optional(),
      amount: z.number(),
      currency: z.string(),
      quantity: z.number(),
    }),
  ),
  customer_email: z.string().email(),
  success_url: z.string(),
  cancel_url: z.string(),
  metadata: z.object({
    activity_id: z.number(),
    payment_details: z.object({
      voucher_id: z.number().nullish(),
      sub_total: z.number(),
      grand_total: z.number(),
      vat: z.number(),
      discounted_amount: z.number(),
    }),
    currency_details: z.object({
      currency_code: z.string(),
      exchange_rate: z.number().optional(),
    }),
    from_date: z.string(),
    to_date: z.string().optional(),
    time_slots: z.array(z.object({
      name: z.string().optional(),
    })).nullish(),
    activity_qty: z.number(),
  }),
});

export const CheckoutSessionSchema = z.object({
  url: z.string(),
});

export const SaveBookingScheme = z.object({
  message: z.string(),
});

export type PromoCodeType = z.infer<typeof ApplyPromoCodeSchema>
export type CreateSessionType = z.infer<typeof CreateSessionSchema>
