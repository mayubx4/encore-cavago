import { z } from 'zod';

export const SubActivitySchema = z.object({
  id: z.number(),
  name: z.string(),
  img_1_url: z.string().nullish(),
  img_2_url: z.string().nullish(),
  img_3_url: z.string().nullish(),
  img_4_url: z.string().nullish(),
  img_5_url: z.string().nullish(),
});

export const FacilityDetailsSchema = z.object({
  id: z.number(),
  facility_name: z.string(),
  address_line_1: z.string(),
  country: z.string(),
  profile_picture: z.string().nullish(),
});

export const BookingDetail = z.object({
  id: z.number(),
  from_date: z.string().nullish(),
  to_date: z.string().nullish(),
  time_slots: z.string().nullish(),
  status: z.string().nullish(),
  sub_activity_id: z.number(),
  duration: z.string().nullish(),
  activity_details: SubActivitySchema.nullish(),
  facility: FacilityDetailsSchema.nullish(),
  booking_fac_details: z.object({
    id: z.number(),
    grand_total: z.string(),
    currency_type: z.string(),
  }).nullish(),
});

export const UserDetailsSchema = z.object({
  id: z.number(),
  facility_id: z.number().nullish(),
  role: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  facility_details: FacilityDetailsSchema.nullish(),
});

export const MessageSchema = z.object({
  id: z.number(),
  sender_id: z.number(),
  receiver_id: z.number(),
  message: z.string(),
  is_read: z.number(),
  type: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  booking_id: z.number().nullish(),
  booking_details: BookingDetail.nullish(),
  sender: UserDetailsSchema,
  receiver: UserDetailsSchema,
});

export const MessagesInboxSchema = z.array(z.object({
  booking_id: z.number().nullish(),
  data: MessageSchema,
}));

export const BookingDetailsSchema = z.object({
  id: z.number(),
  status: z.string(),
  facility_id: z.number(),
  duration: z.string().nullish(),
  facility: z.object({
    id: z.number(),
    facility_name: z.string(),
    address_line_1: z.string(),
    profile_picture: z.string().nullish(),
  }),
});

export const IndividualMessage = z.object({
  id: z.number(),
  sender_id: z.number(),
  receiver_id: z.number(),
  booking_id: z.number().nullish(),
  message: z.string(),
  is_read: z.number(),
  type: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  sender: UserDetailsSchema,
  receiver: UserDetailsSchema,
  attachments: z.array(z.string()).nullish(),
  booking_details: BookingDetail.nullish(),
});

export type IndividualMessageType = z.infer<typeof IndividualMessage>;

export const sendSchema = z.object({
  receiver_id: z.number(),
  message: z.string(),
  booking_id: z.number().nullish(),
  type: z.number().nullish(),
});

export const IndividualMessageSchema = z.object({
  data: z.array(IndividualMessage),
  docs: z.object({
    current_page: z.number(),
    per_page: z.number(),
    total: z.number(),
    last_page: z.number(),
    next_page_url: z.string().nullish(),
    prev_page_url: z.string().nullish(),
  }),
});

export const MessageOutputSchema = z.object({
  message: z.object({
    id: z.number(),
    type: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    sender_id: z.number(),
    receiver_id: z.number(),
    message: z.string(),
  }),
});

export type BookingDetailType = z.infer<typeof BookingDetail>;
export type BookingDetailsSchemaType = z.infer<typeof BookingDetailsSchema>;
export type FacilityDetailsType = z.infer<typeof FacilityDetailsSchema>;
