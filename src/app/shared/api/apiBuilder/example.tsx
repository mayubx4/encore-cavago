/* eslint-disable @typescript-eslint/no-empty-function */
import { QueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { createApi } from './api';
import { query } from './query';

const PostSchema = z.object({
  id: z.string(),
  text: z.string(),
  title: z.string(),
});

const api = createApi(
  {
    queryClient: new QueryClient(),
    debug: {
      mockEnabled: false,
    },
    onError: () => { },
    parseError: () => { },
  },
  {
    getPosts: query({
      output: PostSchema.array(),
      queryFn: async () => [
        {
          id: '12312',
          text: 'some text',
          title: 'some title',
        },
      ],
    }),
  },
);

// eslint-disable-next-line no-unused-expressions
api.getPosts.useQuery().data;
