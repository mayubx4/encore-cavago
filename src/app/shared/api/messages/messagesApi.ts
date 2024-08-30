/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createApi, mutation, query, subApi,
} from '@shared/api/apiBuilder';
import { z } from 'zod';
import axios from '../axios';
import { URLS } from '../urls';
import { queryClient } from '../cavagoReactQueryProvider';
import {
  IndividualMessage, IndividualMessageSchema, MessageOutputSchema, MessagesInboxSchema,
  sendSchema,
} from './schemas';
import { infiniteQuery } from '../apiBuilder/infinite-query';

const messagesApiDef = subApi(
  {
    getMessagesInbox: query({
      output: MessagesInboxSchema,
      queryFn: async (type: number | null | undefined) => {
        const params = type ? { type } : {};

        return (await axios.get(URLS.getMessagesInbox, { params })).data;
      },
    }),
    getIndividualMessages: query({
      output: IndividualMessageSchema,
      queryFn: async (vars: {
        receiver_id: number, page: number | null,
      }) => (
        await axios.get(URLS.getMessages, {
          params: {
            receiver_id: vars.receiver_id,
            booking_id: vars.booking_id,
            page: vars.page ? vars.page : 1,
          },
        })
      ).data,
    }),
    markRead: mutation({
      output: z.string(),
      mutationFn: async (message_ids: number[]) => (
        await axios.patch(URLS.markRead, message_ids)
      ).data,
    }),
    sendDirectMessage: mutation({
      output: MessageOutputSchema,
      mutationFn: async (vars: z.infer<typeof sendSchema>) => (
        await axios.post(URLS.sendDirectMessage, vars)
      ).data,
    }),
    sendMessage: mutation({
      output: MessageOutputSchema,
      mutationFn: async (vars: z.infer<typeof sendSchema>) => (
        await axios.post(URLS.sendMessage, vars)
      ).data,
    }),
    getInfiniteMessages: infiniteQuery({
      defaultOptions: {
        cacheTime: 2000,
        staleTime: 2000,
      },
      output: IndividualMessage,
      queryFn: async ({
        receiver_id,
        booking_id,
      }: {
        receiver_id?: number;
        booking_id?: number;
      }, ctx) => {
        const params = {
          receiver_id,
          page: ctx.pageParam,
        };
        if (booking_id) {
          params.booking_id = booking_id;
        }

        return ((await axios.get(URLS.getMessages, {
          params,
        })).data);
      },
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
  basePath: ['messages'],
}, messagesApiDef);
