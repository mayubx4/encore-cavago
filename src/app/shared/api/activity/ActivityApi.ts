/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createApi, query, subApi,
} from '@shared/api/apiBuilder';
import axios from '../axios';
import { URLS } from '../urls';
import { ActivitySchema } from '../home/schemas';
import { queryClient } from '../cavagoReactQueryProvider';
import { ActivityRatingSchema, MoreActivitiesSchema } from './schemas';
import { infiniteQuery } from '../apiBuilder/infinite-query';

const activityApiDef = subApi(
  {
    getActivity: query({
      output: ActivitySchema,
      queryFn: async (id: string) => (await axios.get(URLS.getActivity.replace('id', id))).data,
    }),
    getActivityRating: query({
      output: ActivityRatingSchema,
      queryFn: async (id: string) => (await axios.get(URLS.getActivityRating + id)).data,
    }),
  },
);

export default createApi({
  queryClient,
  debug: {
    mockEnabled: false,
  },
  onError: () => { },
  parseError: (e) => console.log(e),
  basePath: ['activity'],
}, activityApiDef);
