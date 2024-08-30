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
