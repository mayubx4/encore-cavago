/* eslint-disable no-return-await */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type QueryClient,
  type QueryFilters,
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import { type z } from 'zod';

import { type CreateApiOptions } from './api';
import { queryKeyPartFromVars } from './keys';
import { type SharedCreateVars } from './shared-options';
import {
  type AnyFunction,
  callWithVars,
  type ErrorPlaceholder,
  type FirstFunctionParameter,
  type GenericOutputSchema,
  parseReturnValue,
} from './utils';

export type GenericQueryFn<OutputSchema extends GenericOutputSchema> = (
  vars: any
) => Promise<z.input<OutputSchema>>;

export type GenericMockQueryFn<OutputSchema extends GenericOutputSchema> = (
  vars: any
) => Promise<z.input<OutputSchema> | void>;

export type CreateQueryVars<
  OutputSchema extends GenericOutputSchema,
  QueryFn extends GenericQueryFn<OutputSchema> | undefined
> = {
  output: OutputSchema;
  queryFn?: QueryFn;
  mockFn?: QueryFn;
  defaultOptions?: UseQueryOptionsInternal<GenericQueryDefinition>;
} & SharedCreateVars;

export type QueryDefinition<
  OutputSchema extends GenericOutputSchema,
  QueryFn extends GenericQueryFn<OutputSchema> | undefined
> = CreateQueryVars<OutputSchema, QueryFn> & {
  _type: 'query';
};

export type GenericQueryDefinition = QueryDefinition<
  GenericOutputSchema,
  GenericQueryFn<any> | undefined
>;

export type QueryInputVars<QueryFn extends GenericQueryFn<any> | undefined> =
  FirstFunctionParameter<NonNullable<QueryFn>>;

export type ExposedQueryFnType<QueryDefinition extends GenericQueryDefinition> =
  QueryVarsFromDefinition<QueryDefinition> extends undefined
  ? (
    vars?: QueryVarsFromDefinition<QueryDefinition>
  ) => Promise<z.infer<QueryDefinition['output']>>
  : (
    vars: QueryVarsFromDefinition<QueryDefinition>
  ) => Promise<z.infer<QueryDefinition['output']>>;

export function queryApiFromDefinition<
  OutputSchema extends GenericOutputSchema,
  QueryFn extends GenericQueryFn<OutputSchema> | undefined,
  ErrorReturn
>({
  def,
  path,
  options,
}: {
  def: QueryDefinition<OutputSchema, QueryFn>;
  path: string[];
  options: CreateApiOptions<ErrorReturn>;
}): QueryApiFromDefinition<
  QueryDefinition<OutputSchema, QueryFn>,
  ErrorReturn
> {
  type DataType = z.infer<OutputSchema>;
  type Def = QueryDefinition<OutputSchema, QueryFn>;
  const baseQueryKey = [...path];
  const { queryClient } = options;

  const mergedDebug = {
    ...options.debug,
    ...def.debug,
  };

  const mergedCreateApiOptions = {
    ...options,
    debug: mergedDebug,
  };

  function _makeQueryFn(vars: QueryInputVars<QueryFn>) {
    return async () => {
      const shouldUseMock = mergedDebug.mockEnabled && mergedCreateApiOptions.isDev;
      const willAutoMock = shouldUseMock && !def.mockFn;
      const result = shouldUseMock
        ? await callWithVars({
          fn: def.mockFn,
          vars,
          errorMessage: 'No mockFn function passed to query().',
          path,
          options: mergedCreateApiOptions,
        })
        : await callWithVars({
          fn: def.queryFn,
          vars,
          errorMessage: 'No queryFn passed to query().',
          path,
          options: mergedCreateApiOptions,
        });

      if (willAutoMock) {
        // Skip parsing for auto mock because it applies effects and parsing fails
        return result;
      }

      return parseReturnValue({
        schema: def.output,
        val: result,
        path,
        type: 'query',
        options: mergedCreateApiOptions,
        vars,
      });
    };
  }

  const _useQuery: UseQueryInternal<Def, ErrorReturn> = ((
    vars: QueryVarsFromDefinition<Def>,
    options?: UseQueryOptionsInternal<Def>,
  ) =>

    // I think the as any for options are necessary because we're using a function overload that
    // isn't the last declared function overload in the react query types
    useQuery({
      queryKey: [...baseQueryKey, ...queryKeyPartFromVars(vars as any)],
      queryFn: _makeQueryFn(vars),
      ...(def.defaultOptions as any),
      ...(options as any),
    } as any)
  ) as any;

  const exposedQueryFn: ExposedQueryFnType<Def> = (async (
    vars: QueryVarsFromDefinition<Def>,
  ) => {
    const fn = _makeQueryFn(vars);

    return await fn();
  }) as any;

  return {
    useQuery: _useQuery,
    invalidate: (vars?: QueryInputVars<QueryFn>) => {
      if (vars) {
        queryClient.invalidateQueries([
          ...baseQueryKey,
          ...queryKeyPartFromVars(vars),
        ] as any);
      } else {
        queryClient.invalidateQueries(baseQueryKey as any);
      }
    },
    setData: (
      vars: QueryInputVars<QueryFn>,
      updater: (oldData: undefined | DataType) => DataType,
    ) => {
      queryClient.setQueryData(
        [...baseQueryKey, ...queryKeyPartFromVars(vars)],
        updater,
      );
    },
    prefetch: async (vars, options) => {
      await queryClient.prefetchQuery({
        queryKey: [...baseQueryKey, ...queryKeyPartFromVars(vars as any)],
        queryFn: _makeQueryFn(vars),
        ...options,
      });
    },
    getData: (vars) => queryClient.getQueryData([
      ...baseQueryKey,
      ...queryKeyPartFromVars(vars as any),
    ]),
    queryFn: exposedQueryFn,
    _type: 'query',
  };
}

/**
 * Helper to create a query definition
 * @param vars CreateQueryVars
 * @returns
 */
export function query<
  OutputSchema extends GenericOutputSchema,
  QueryFn extends GenericQueryFn<OutputSchema> | undefined = undefined
>(
  vars: CreateQueryVars<OutputSchema, QueryFn>,
): QueryDefinition<OutputSchema, QueryFn> {
  return {
    ...vars,
    _type: 'query',
  };
}

export type UseQueryOptionsInternal<
  QueryDefinition extends GenericQueryDefinition
> = Omit<
  UseQueryOptions<z.infer<QueryDefinition['output']>, ErrorPlaceholder>,
  'queryKey' | 'queryFn'
>;

export type QueryVarsFromDefinition<
  QueryDefinition extends GenericQueryDefinition
> = AnyFunction extends QueryDefinition['mockFn']
  ? FirstFunctionParameter<NonNullable<QueryDefinition['mockFn']>>
  : AnyFunction extends QueryDefinition['queryFn']
  ? FirstFunctionParameter<NonNullable<QueryDefinition['queryFn']>>
  : never;

export type QueryFnVarsFromDef<QueryDefinition extends GenericQueryDefinition> =
  QueryVarsFromDefinition<QueryDefinition>;

export type UseQueryInternal<
  QueryDefinition extends GenericQueryDefinition,
  ErrorReturn
> = QueryVarsFromDefinition<QueryDefinition> extends undefined
  ? (
    vars?: QueryVarsFromDefinition<QueryDefinition>,
    options?: UseQueryOptionsInternal<QueryDefinition>
  ) => UseQueryResultInternal<QueryDefinition, ErrorReturn>
  : (
    vars: QueryVarsFromDefinition<QueryDefinition>,
    options?: UseQueryOptionsInternal<QueryDefinition>
  ) => UseQueryResultInternal<QueryDefinition, ErrorReturn>;

export type UseQueryResultInternal<
  QueryDefinition extends GenericQueryDefinition,
  ErrorReturn
> = UseQueryResult<z.infer<QueryDefinition['output']>, ErrorReturn> & {};

export type QueryPrefetchOptionsInternal = Omit<
  Parameters<QueryClient['prefetchQuery']>[0],
  'queryKey' | 'queryFn'
>;

export interface QueryApiFromDefinition<
  QueryDefinition extends GenericQueryDefinition,
  ErrorReturn
> {

  /**
   * Use query hook that works like a typical tanstack query useQuery hook except that it accepts a "variables" object as its first parameter,
   * and the query options as its second parameter.
   *
   * @param vars Variables for the query, which will match the variables passed to the queryFn when defining the query.
   * @param options Optional options for the query, see tanstack docs for all options available. If you need to pass these and queryFn doesn't have any variables,
   * you can pass undefined as the first parameter.
   * @example
   * ```tsx
   * // query def
   * const api = createApi({
   *  productDetail: query({
   *    queryFn: async (vars: {id: string}) => {
   *      // ...
   *    }
   *  })
   * })
   *
   * // usage
   * api.productDetail.useQuery({id: "some-product-id"}, {
   *  refetchInterval: 10000,
   * })
   * ```
   */
  useQuery: UseQueryInternal<QueryDefinition, ErrorReturn>;

  /**
   * Invalidates a query. If variables are passed, it will invalidate any cache specific to those variables. If they aren't passed,
   * then it will invalidate all queries associated with the query def.
   *
   * From tanstack docs:
   * - It is marked as stale. This stale state overrides any staleTime configurations being used in useQuery or related hooks
   * - If the query is currently being rendered via useQuery or related hooks, it will also be refetched in the background
   *
   * @param vars Optional - If passed the query for the passed vars will be invalidated. If left undefined, all caches for this query will be invalidated.
   * @returns nothing
   * @example
   * ```tsx
   * // invalidate cache for product with id `0`
   * api.productDetail.invalidate({id: 0})
   * // invalidate all caches for productDetail query
   * api.productDetail.invalidate();
   * ```
   */
  invalidate: (vars?: QueryVarsFromDefinition<QueryDefinition>) => void;

  /**
   * Manually updates the query data, useful after mutations to immediately show data to the user.
   * @param vars The vars for which to update the query cache (IE `{productId: "some-product-id"}`)
   * @param updater An updater function that receives the previous data as a parameter and returns the new data
   * @example
   *
   * ```tsx
   * // query def
   * const api = createApi({
   *  productDetail: query({
   *    queryFn: async (vars: {id: string}) => {
   *      // ...
   *    }
   *  })
   * })
   * // usage
   * api.productDetail.setData({id: 0}, (oldProduct) => {
   *  return {
   *    favoritedByUser: true,
   *    ...oldProduct,
   *  }
   * })
   * ```
   */
  setData: (
    vars: QueryVarsFromDefinition<QueryDefinition>,
    updater: (
      oldData: undefined | z.infer<QueryDefinition['output']>
    ) => undefined | z.infer<QueryDefinition['output']>
  ) => void;

  /**
   * Synchronously gets the data currently stored in the cache for some vars. You probably don't want to use this, components should get data from `.useQuery().data`
   * @param vars Variables for the query function
   * @param filters Optional QueryFilter
   * @returns The data currently in the cache for the past vars
   */
  getData: (
    vars: QueryVarsFromDefinition<QueryDefinition>,
    filters?: QueryFilters
  ) => z.infer<QueryDefinition['output']> | undefined;

  /**
   * Prefetches the data for a query. Relevant points from tanstack docs
   * - If data for this query is already in the cache and not invalidated, the data will not be fetched
   * - If a staleTime is passed eg. prefetchQuery({queryKey: ['todos'], queryFn: fn, staleTime: 5000 }) and the data is older than the specified staleTime, the query will be fetched
   * - If no instances of useQuery appear for a prefetched query, it will be deleted and garbage collected after the time specified in cacheTime.
   * @param vars
   * The variables for the queryFn
   * @param options
   * Other options for the prefetch (staleTime, cacheTime), see tanstack docs for all options
   * @example
   * ```tsx
   * // prefetch product with the id 0
   * api.productDetail.prefetch({id: 0})
   * ```
   */
  prefetch: (
    vars: QueryVarsFromDefinition<QueryDefinition> extends undefined
      ? void
      : QueryVarsFromDefinition<QueryDefinition>,
    options?: QueryPrefetchOptionsInternal
  ) => Promise<void>;

  /**
   * A function to call the query function directly. This will parse and validate the request, but it does not put the data into the cache.
   */
  queryFn: ExposedQueryFnType<QueryDefinition>;

  _type: 'query';
}
