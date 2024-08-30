import { z } from 'zod';

export const HostProfileSchema = z.object({
  facility_images: z.object({
    img_1_url: z.string().nullish(),
    img_2_url: z.string().nullish(),
    img_3_url: z.string().nullish(),
    img_4_url: z.string().nullish(),
    img_5_url: z.string().nullish(),
    img_6_url: z.string().nullish(),
    img_7_url: z.string().nullish(),
    img_8_url: z.string().nullish(),
    img_9_url: z.string().nullish(),
    img_10_url: z.string().nullish(),
  }),
  description: z.string().nullish(),
  facility_transports: z.object({
    transport_mode: z.string().nullish(),
    description: z.string().nullish(),
  }).array(),
  facility_user: z.object({
    first_name: z.string(),
    last_name: z.string(),
    facility_id: z.number(),
  }).nullish(),
  facility_name: z.string(),
  city: z.string(),
  country: z.string(),
  activities_for_all_skill_levels: z.boolean(),
  overview_quick_view: z.object({
    specialities_title: z.string().nullish(),
    specialities_descrioption: z.string().nullish(),
    cavago_extras: z.string().nullish(),
    cavago_extras_heading: z.string().nullish(),
    brief_description_heading: z.string().nullish(),
    brief_description: z.string().nullish(),
    latitude: z.string(),
    longitude: z.string(),
  }),
  main_page_overview: z.object({
    meta_description: z.string().nullish(),
  }),
});

export type HostProfileType = z.infer<typeof HostProfileSchema>;
