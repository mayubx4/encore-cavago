// todo : export all types from z.infer here and use them in relevant places

import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginResponseSchema = z.object({
  token_type: z.string(),
  access_token: z.string(),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  password_confirmation: z.string().min(8),
  role: z.number(),
  email_verification_method: z.string(),
});

export const registerSchemaForm = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  password_confirmation: z.string().min(8),
});

export const registerResponseSchema = z.object({
  message: z.string(),
});

export const otpSchemaForm = z.object({
  otp: z.string().length(6),
});

export const otpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

export const otpResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),

  // TODO: fix this
  user: z.any(),
});

export const getOtpSchema = z.object({
  email: z.string().email(),
});

export const getOtpResponseSchema = z.object({
  message: z.string(),
});

export const saveCustomerDataSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  country: z.string(),
  phone: z.string(),
  ability: z.string(),
});

export const googleLogin = z.object({
  token: z.string(),
  role: z.number(),
  app_type: z.string(),
});

export const googleLoginResponse = z.object({
  access_token: z.string(),
  token_type: z.string(),

  // TODO: fix this
  user: z.any(),
});

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  google_id: z.string().nullish(),
  apple_id: z.string().nullish(),
  first_name: z.string().nullish(),
  last_name: z.string().nullish(),
  password_updated_at: z.string().nullish(),
  user_profile: z.object({
    country: z.string(),
    phone: z.string(),
    ability: z.string(),
    img_1: z.string().nullish(),
    img_1_url: z.string().nullish(),
  }).nullish(),
});

export const pastAcitivitiesScheme = z.object({
  id: z.number(),
  payment_id: z.number().nullish(),
  booking_activity_id: z.number(),
  facility_id: z.number(),
  booking_user_id: z.number(),
  sub_activity_id: z.number(),
  from_date: z.string(),
  to_date: z.string().nullable(),
  time_slots: z.array(
    z.object({
      time_slot: z.string().nullable(),
    }),
  ),
  activity_quantity: z.number(),
  host_note: z.any().nullable(),
  status: z.string(),
  currency: z.string(),
  reference_no: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  postponed_datetime: z.any().nullable(),
  duration: z.string(),
  booking_user: z.object({
    id: z.number(),
    user_id: z.number(),
    phone: z.string(),
    city: z.string().nullable(),
    address: z.string().nullable(),
    country: z.string(),
    img_1_url: z.string().nullable(),
    user_info: z.object({
      id: z.number(),
      first_name: z.string(),
      last_name: z.string(),
      email: z.string().email(),
    }),
  }),
  facility: z.object({
    id: z.number(),
    facility_name: z.string(),
    base_currency: z.string(),
    contact_person: z.string(),
    address_line_1: z.string(),
    address_line_2: z.string(),
    city: z.string(),
    country: z.string(),
    profile_picture: z.string().nullable(),
  }),
  booking_activity: z.object({
    id: z.number(),
    seasonal_status: z.any().nullable(),
    booking_fc_id: z.number(),
    booking_fac_details: z.object({
      id: z.number(),
      vat: z.string(),
      total: z.string(),
      grand_total: z.string(),
    }),
  }),
  sub_activity: z.object({
    id: z.number(),
    equine_main_activity_id: z.number(),
    name: z.string(),
    activity_types: z.number(),
    img_1_url: z.string().nullable(),
    img_2_url: z.string().nullable(),
    img_3_url: z.string().nullable(),
    img_4_url: z.string().nullable(),
    img_5_url: z.string().nullable(),
    eq_main_activity: z.object({
      id: z.number(),
      title: z.string(),
    }),
  }),
  payment_details: z.any().nullable(),
});

export type UserType = z.infer<typeof userSchema>;

export type UpdatePasswordFormData = {
  current_password: string;
  new_password: string;
  confirm_password: string;
  is_forgot_password: boolean;
};

export type ForgotPasswordOTPFormData = {
  email: string;
};
export type VerifyForgotPasswordOTPFormData = {
  email: string;
  otp: string;
};

export type PastActivityType = {
  id: number;
  payment_id?: number | null;
  booking_activity_id: number;
  facility_id: number;
  booking_user_id: number;
  sub_activity_id: number;
  from_date: string;
  to_date?: string | null;
  time_slots: {
    time_slot?: string | null;
  }[];
  activity_quantity: number;
  host_note?: any | null;
  status: string;
  currency: string;
  reference_no: string;
  created_at: string;
  updated_at: string;
  postponed_datetime?: any | null;
  duration: string;
  booking_user: {
    id: number;
    user_id: number;
    phone: string;
    city?: string | null;
    address?: string | null;
    country: string;
    img_1_url?: string | null;
    user_info: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
  };
  facility: {
    id: number;
    facility_name: string;
    base_currency: string;
    contact_person: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    country: string;
    profile_picture?: string | null;
  };
  booking_activity: {
    id: number;
    seasonal_status?: any | null;
    booking_fc_id: number;
    booking_fac_details: {
      id: number;
      vat: string;
      total: string;
      grand_total: string;
    };
  };
  sub_activity: {
    id: number;
    equine_main_activity_id: number;
    name: string;
    activity_types: number;
    img_1_url?: string | null;
    img_2_url?: string | null;
    img_3_url?: string | null;
    img_4_url?: string | null;
    img_5_url?: string | null;
    eq_main_activity: {
      id: number;
      title: string;
    };
  };
  payment_details?: any | null;
};
