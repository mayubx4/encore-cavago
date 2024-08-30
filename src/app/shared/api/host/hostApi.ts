/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createApi, query, subApi,
} from '@shared/api/apiBuilder';
import { queryClient } from '../cavagoReactQueryProvider';
import axios from '../axios';
import { URLS } from '../urls';
import { HostProfileSchema } from './schemas';
import { DataResponseSchema } from '../shared/schemas/successResponse';

const activityApiDef = subApi(
  {
    getHostProfile: query({
      output: DataResponseSchema(HostProfileSchema),
      queryFn: async (hostId) => (await axios.get(URLS.getHostProfile, { params: { host_id: hostId } })).data,
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
  basePath: ['user'],
}, activityApiDef);
