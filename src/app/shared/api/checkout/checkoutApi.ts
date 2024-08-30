/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createApi, mutation, subApi,
} from '@shared/api/apiBuilder';
import axios from '../axios';
import { URLS } from '../urls';
import {
  ApplyPromoCodeSchema, CheckoutSessionSchema, CreateSessionType, SaveBookingScheme,
} from './schemas';
import { queryClient } from '../cavagoReactQueryProvider';
import { handleApiError, parseApiErrors } from '../shared/errorHandling/errorHandling';
import apiErrorHandling from '../apiErrorHandling';
import apiErrorLogging from '../apiErrorLogging';
import {
  handlePromoCodeErrors, handleSessionErrors, checkoutErrorClasses,
  handleSaveBookingErrors,
} from './checkoutErrorHandling/checkoutErrorHandlers';

const checkoutApiDef = subApi(
  {
    applyPromoCode: mutation({
      output: ApplyPromoCodeSchema,
      mutationFn: async ({
        sub_activity_id,
        sub_total,
        add_on,
        vat,
        promo_code,
      }: {
        sub_activity_id: number;
        sub_total: number;
        add_on: number;
        vat: number;
        promo_code: string;
      }) => (
        await axios.post(URLS.applyPromoCode, {
          sub_activity_id,
          sub_total,
          add_on,
          vat,
          promo_code,
        })
          .catch((error) => handleApiError(error, [handlePromoCodeErrors]))
      ).data,
    }),
    createSession: mutation({
      output: CheckoutSessionSchema,
      mutationFn: async (data: CreateSessionType) => (
        await axios.post(URLS.createSession, data)
          .catch((error) => handleApiError(error, [handleSessionErrors]))
      ).data,
    }),
    saveBooking: mutation({
      output: SaveBookingScheme,
      mutationFn: async ({ checkout_session_id }: { checkout_session_id: string; }) => (
        await axios.post(URLS.saveBooking, { checkout_session_id })
          .catch((error) => handleApiError(error, [handleSaveBookingErrors]))
      ).data,
    }),
  },
);

export default createApi({
  queryClient,
  debug: {
    mockEnabled: false,
  },
  onError: apiErrorHandling,
  parseError: (error) => parseApiErrors(error, checkoutErrorClasses),
  logError: apiErrorLogging,
  basePath: ['checkout'],
}, checkoutApiDef);
