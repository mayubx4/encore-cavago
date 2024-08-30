/* eslint-disable @typescript-eslint/no-empty-function */
import { createApi, query, subApi } from '@shared/api/apiBuilder';
import { DEFAULT_CATEGORY_ID } from '@shared/constants/home';
import { FilterType } from '@shared/hooks/homeFiltersContext';
import axios from '../axios';
import { URLS } from '../urls';
import { ActivitySchema, CategorySchema, SearchSuggestionsSchema } from './schemas';
import { infiniteQuery } from '../apiBuilder/infinite-query';
import { queryClient } from '../cavagoReactQueryProvider';

const homeApiDef = subApi(
  {
    getCategories: query({
      output: CategorySchema.array(),
      queryFn: async () => (await axios.get(URLS.getCategories)).data,
    }),
    getActivities: infiniteQuery({
      output: ActivitySchema,
      defaultOptions: {
        staleTime: 0,
        cacheTime: 0,
      },
      queryFn: async ({
        categoryId = DEFAULT_CATEGORY_ID, subCategoryIds, limit = 10, search, facility_id, filters, popular = false,
      }: {
        categoryId?: number; subCategoryIds?: number[]; limit?: number; search?: string; searchCategory?: string;
        facility_id?: number; filters?: FilterType; popular?: boolean;
      }, ctx) => {
        let params = {
          limit,
          page: ctx.pageParam,
          main_category_id: categoryId,
          sub_category_id: subCategoryIds,
          facility_id,
          popular,
          ...filters,
        };

        if (search) {
          params = { ...params, search }
        }

        return ((await axios.get(URLS.getActivities, {
          params,
        })).data);
      },
    }),
    getSearchSuggestions: query({
      output: SearchSuggestionsSchema.array(),
      queryFn: async ({ search }: {
        search: string;
      }) => (await axios.get(URLS.getSearchSuggestions, { params: { search } })).data,
    }),
  },
);

export default createApi({
  queryClient,
  debug: {
    mockEnabled: false,
  },
  onError: (e) => { console.log(e.error.issues); },
  parseError: (e) => e,
  basePath: ['home'],
}, homeApiDef);
