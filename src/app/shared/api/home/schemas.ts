import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.number(),
  title: z.string(),
  sub_categories: z.object({
    id: z.number(),
    title: z.string(),
    equine_main_activity_id: z.number(),
  }).array(),
});

export const ActivityAddOns = z.object({
  id: z.number(),
  product_id: z.number(),
  facility_id: z.number(),
  title: z.string(),
  description: z.string().nullish(),
  price: z.string(),
  quantity: z.number(),
  mandatory_status: z.number(),
});

export const SeasonalRatesSchema = z.object({
  id: z.number().nullish(),
  facility_id: z.number().nullish(),
  equine_sub_activity_id: z.number().nullish(),
  seasional_price: z.string(),
  seasional_from_date: z.string(),
  seasional_to_date: z.string(),
  seasional_title: z.string().nullish(),
  seasional_description: z.string().nullish(),
  seasional_weekend: z.string().nullish(),
  seasional_weekend_price: z.string().nullish(),
});

export const ExceptionDatesSchema = z.object({
  start_date: z.string().nullish(),
  end_date: z.string().nullish(),
});

export const TicketSchema = z.object({
  type: z.string(),
  price: z.string(),
  quantity_available: z.string(),
  user_selected_quantity: z.number(),
});

export const PriceJsonSchema = z.object({
  tickets: z.array(TicketSchema),
});

export const TicketScheduleSchema = z.object({
  id: z.number(),
  equine_sub_activity_id: z.number(),
  ticket_type: z.number(),
  price_json: PriceJsonSchema,
  date_time_json: z.object({
    specific_date: z.array(z.object({
      start_date: z.string(),
      end_date: z.string(),
    })),
    date_time_condition: z.object({
      date_type: z.string(),
      date_required_flag: z.number(),
      time_type: z.string().nullish(),
      time_required_flag: z.number(),
    }),
  }),
  date_selection_format: z.string(),
});

export const ActivitySchema = z.object({
  id: z.number(),
  is_favourite: z.boolean().nullish(),
  facility_id: z.number(),
  equine_main_activity_id: z.number().nullish(),
  category_group_status: z.number().nullish(),
  beginner_status: z.number().nullish(),
  name: z.string().nullish(),
  activity_types: z.number().nullish(),
  group_minimum: z.number().nullish(),
  group_maximum: z.number().nullish(),
  category_individual_status: z.number().nullish(),
  category_shared_status: z.number().nullish(),
  img_1: z.string().nullish(),
  img_1_url: z.string().nullish(),
  img_2: z.string().nullish(),
  img_2_url: z.string().nullish(),
  img_3: z.string().nullish(),
  img_3_url: z.string().nullish(),
  img_4: z.string().nullish(),
  img_4_url: z.string().nullish(),
  img_5: z.string().nullish(),
  img_5_url: z.string().nullish(),
  base_price: z.string().nullish(),
  status: z.number(),
  age_minimum: z.string().nullish(),
  age_maximum: z.string().nullish(),
  cancellation_policy: z.string().nullish(),
  age_adult_status: z.number().nullish(),
  age_child_status: z.number().nullish(),
  age_both_status: z.number().nullish(),
  session_description: z.string().nullish(),
  unit: z.number().nullish(),
  package_specific_date_status: z.number().nullish(),
  package_specific_date: z.array(z.object({
    from: z.string().nullish(),
    to: z.string().nullish(),
  })).nullish(),
  availablity_from: z.string().nullish(),
  availablity_to: z.string().nullish(),
  activity_type_hours: z.string().nullish(),
  activity_type_days: z.number().nullish(),
  available_specific_time_status: z.number().nullish(),
  available_from_time: z.string().nullish(),
  available_to_time: z.string().nullish(),
  available_time_slots: z.string().nullish(),
  days_disabled: z.string().nullish(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
  rider_ability: z.array(z.union([z.number(), z.string()])).or(z.string()).nullish(),
  eq_main_activity: z.object({
    title: z.string(),
  }).nullish(),
  facility_details: z.object({
    id: z.number(),
    facility_name: z.string(),
    city: z.string().nullish(),
    vat_percentage: z.number().nullish(),
    state: z.string().nullish(),
    country: z.string().nullish(),
    base_currency: z.string(),
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
  }).nullish(),
  eq_tcs: z.object({
    id: z.number(),
    facility_id: z.number(),
    sub_activity_id: z.number(),
    description: z.string().nullish(),
  }).nullish(),
  schedule_dates: z.array(z.object({
    start_date: z.string(),
    end_date: z.string(),
    start_time: z.string(),
    end_time: z.string(),
  })).optional(),
  exception_dates: z.array(ExceptionDatesSchema).optional(),
  seasonal_rates: z.array(SeasonalRatesSchema).optional(),
  activity_add_ons: z.array(ActivityAddOns).optional(),
  ticket_schedule: TicketScheduleSchema.optional(),
});

export const SearchSuggestionsSchema = z.object({
  id: z.number(),
  facility_id: z.number(),
  name: z.string(),
  facility_details: z.object({
    id: z.number(),
    facility_name: z.string(),
    city: z.string(),
    country: z.string(),
  }).nullish(),
});

export type ActivityType = z.infer<typeof ActivitySchema>;
