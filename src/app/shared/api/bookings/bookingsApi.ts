/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createApi, query, subApi,
} from '@shared/api/apiBuilder';
import axios from '../axios';
import { URLS } from '../urls';
import { queryClient } from '../cavagoReactQueryProvider';
import { bookingSchema } from './schemas';

const messagesApiDef = subApi(
  {
    getUpcomingBookings: query({
      output: bookingSchema.array(),
      queryFn: async () => (await axios.get(URLS.getUpcomingBookings)).data,
    }),
    getPreviousBookings: query({
      output: bookingSchema.array(),
      queryFn: async () => (await axios.get(URLS.getPreviousBookings)).data,
    }),
    getBookingDetails: query({
      output: bookingSchema,
      queryFn: async ({ id, facilityId }) => (await axios.get(URLS.getBookingDetails.replace('facility_id', facilityId).replace('booking_id', id))).data,
    }),
  },
);

export default createApi({
  queryClient,
  debug: {
    mockEnabled: false,
  },
  onError: () => { },
  parseError: (e) => console.log(e.error.issues),
  basePath: ['bookings'],
}, messagesApiDef);
