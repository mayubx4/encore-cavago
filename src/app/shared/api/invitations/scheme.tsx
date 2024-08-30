import { z } from 'zod';

export const InvitationSchema = z.object({
  id: z.number(),
  allocate_from: z.string(),
  allocate_to: z.string(),
  allocate_day: z.string(),
  allocate_time_slot: z.string(),
  status: z.number().nullish(),
  sub_activities: z.object({
    id: z.number(),
    name: z.string(),
    base_price: z.string(),
    img_1: z.string().nullish(),
    img_2: z.string().nullish(),
    img_3: z.string().nullish(),
    img_4: z.string().nullish(),
    img_5: z.string().nullish(),
    session_description: z.string().nullish(),
  }),
  facility_details: z.object({
    base_currency: z.string(),
    city: z.string(),
    country: z.string(),
    facility_name: z.string(),
    profile_picture: z.string().nullish(),
    overview_quick_view: z.object({
      id: z.number(),
      facility_id: z.number(),
      brief_description_heading: z.string().nullish(),
      brief_description: z.string().nullish(),
      specialities_title: z.string().nullish(),
      specialities_descrioption: z.string().nullish(),
      longitude: z.string().nullish(),
      latitude: z.string().nullish(),
    }).nullish(),
  }),
  b_facilities: z.array(
    z.object({}),
  ).nullish(),
});

export type InvitationType = z.infer<typeof InvitationSchema>;

export const DeclineInvitationSchema = z.object({
  message: z.string(),
})
