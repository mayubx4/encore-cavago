/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createApi, mutation, query, subApi,
} from '@shared/api/apiBuilder';
import { z } from 'zod';
import axios from '../axios';
import { URLS } from '../urls';
import { ToggleFvrtSchema, WishlistSchema } from './schemas';
import { infiniteQuery } from '../apiBuilder/infinite-query';
import { queryClient } from '../cavagoReactQueryProvider';

const activityApiDef = subApi(
  {
    toggleFvrt: mutation({
      output: ToggleFvrtSchema,
      mutationFn: async ({
        activity_id,
        mark_unfavourite,
      }: {
        activity_id: number,
        mark_unfavourite?: boolean
      }) => (
        await axios.post(URLS.toggleFvrt, { activity_id, mark_unfavourite })).data,
    }),
    getWishlist: infiniteQuery({
      defaultOptions: {
        cacheTime: 0,
        staleTime: 0,
      },
      output: WishlistSchema,
      queryFn: async ({ limit = 8 }: { limit?: number }, ctx) => {
        const params = {
          limit,
          page: ctx.pageParam,
        };

        return (await axios.get(URLS.getWishlist, { params })).data;
      },
    }),
  },
);

export default createApi({
  queryClient,
  debug: {
    mockEnabled: false,
  },
  onError: (e) => console.log(e.error.issues),
  parseError: (e) => e,
  basePath: ['activity'],
}, activityApiDef);
