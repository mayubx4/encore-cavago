'use client';

import { z } from 'zod';
import { AxiosError } from 'axios';
import {
  createApi, mutation, query, subApi,
} from '@shared/api/apiBuilder';
import {
  loginResponseSchema,
  registerResponseSchema,
  registerSchema,
  loginSchema,
  otpSchema,
  getOtpSchema,
  otpResponseSchema,
  getOtpResponseSchema,
  saveCustomerDataSchema,
  googleLogin,
  googleLoginResponse,
  userSchema,
  UserType,
  UpdatePasswordFormData,
  ForgotPasswordOTPFormData,
  pastAcitivitiesScheme,
} from '@shared/api/authentication/schemas';

import { URLS } from '@shared/api/urls';
import { File } from 'buffer';
import performMutation from './util';
import axios from '../axios';
import { queryClient } from '../cavagoReactQueryProvider';
import { successResponse } from '../shared/schemas/successResponse';
import apiErrorHandling from '../apiErrorHandling';
import { handleUpdatePasswordErrors, authenticationErrorClasses } from './authenticationErrorHandling/authenticationErrorHandlers';
import apiErrorLogging from '../apiErrorLogging';
import { handleApiError, parseApiErrors } from '../shared/errorHandling/errorHandling';

const authenticationApiDef = subApi(
  {
    performLogin: mutation({
      mutationFn: async (
        vars: z.infer<typeof loginSchema>,
      ) => (
        performMutation(URLS.login, loginSchema, { ...vars, app_type: 'customer' })
      ),
      output: loginResponseSchema,
    }),
    getRegistered: mutation({
      mutationFn: async (
        vars: z.infer<typeof registerSchema>,
      ) => performMutation(URLS.register, registerSchema, vars),
      output: registerResponseSchema,
    }),
    verifyOtp: mutation({
      mutationFn: async (
        vars: z.infer<typeof otpSchema>,
      ) => performMutation(URLS.verifyOtp, otpSchema, vars),
      output: otpResponseSchema,
    }),
    getOtp: mutation({
      mutationFn: async (
        vars: z.infer<typeof getOtpSchema>,
      ) => performMutation(URLS.getOtp, getOtpSchema, vars),
      output: getOtpResponseSchema,
    }),
    onResendOtp: mutation({
      mutationFn: async (
        vars: z.infer<typeof getOtpSchema>,
      ) => performMutation(URLS.onResendOtp, getOtpSchema, vars),
      output: getOtpResponseSchema,
    }),
    onSaveCustomerData: mutation({
      mutationFn: async (vars: z.infer<typeof saveCustomerDataSchema>) => performMutation(
        URLS.saveCustomerProfile,
        saveCustomerDataSchema,
        vars,
      ),

      // TODO: fix this;
      output: z.any(),
    }),
    loginViaGoogle: mutation({
      mutationFn: async (vars: z.infer<typeof googleLogin>) => performMutation(
        URLS.loginViaGoogle,
        googleLogin,
        vars,
      ),
      output: googleLoginResponse,
    }),
    getUser: query({
      queryFn: async () => (await axios.get(URLS.getUser)).data,
      output: userSchema,
    }),
    updateProfile: mutation({
      output: z.any(),
      mutationFn: async (vars: Partial<UserType> & { avatar?: File }) => {
        const params = {
          first_name: vars.first_name,
          last_name: vars.last_name,
          country: vars.user_profile?.country,
          phone: vars.user_profile?.phone,
          ability: vars.user_profile?.ability,
        };
        if (vars.avatar) {
          params.avatar = new Blob([vars?.avatar as any]);
        }
        const formData = new FormData();

        // eslint-disable-next-line guard-for-in
        for (const i in params) {
          formData.append(i, params[i]);
        }

        return (await axios.post(URLS.updateProfile, formData)).data;
      },
    }),
    updatePassword: mutation({
      output: z.string(),
      mutationFn: async (vars: UpdatePasswordFormData) => (
        await axios.patch(URLS.updatePassword, vars, { headers: { 'Content-Type': 'multipart/form-data' } })
          .catch((error) => handleApiError(error, [handleUpdatePasswordErrors]))
      ).data,
    }),
    forgotPasswordOTP: mutation({
      output: successResponse,
      mutationFn: async (vars: ForgotPasswordOTPFormData) => (await axios.post(URLS.forgotPasswordOTP, vars)).data,
    }),

    // TODO: Implement Pagination in Past Activities
    getPastActivities: query({
      output: pastAcitivitiesScheme.array(),
      queryFn: async () => (await axios.get(URLS.getPastActivities)).data,
    }),
    disconnectSocial: mutation({
      output: z.object({
        message: z.string(),
      }),
      mutationFn: async ({ provider }: { provider: 'google' | 'apple' }) => (await axios.delete(provider === 'apple' ? URLS.disconnectApple : URLS.disconnectGoggle)).data,
    }),
  },
);

const authApi = createApi(
  {
    queryClient,
    debug: {
      mockEnabled: false,
    },
    onError: apiErrorHandling,
    parseError: (error) => parseApiErrors(error, authenticationErrorClasses),
    logError: apiErrorLogging,
    basePath: ['authentication'],
  },
  authenticationApiDef,
);

export default authApi;
