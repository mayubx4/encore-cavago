/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
/* eslint-disable max-len */
/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Work in progress
 */
import {
  type InfiniteData,
  type QueryClient,
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { z, type ZodSchema } from 'zod';

import { type CreateApiOptions } from './api';
import { queryKeyPartFromVars } from './keys';
import { type GenericQueryDefinition } from './query';
import { type SharedCreateVars } from './shared-options';
import {
  type AnyFunction,
  callWithVars,
  type ErrorPlaceholder,
  type FirstFunctionParameter,
  type GenericOutputSchema,
  parseReturnValue,
} from './utils';

export const ApiPayloadResponseSchema = <Schema extends ZodSchema>(
  objectSchema: Schema,
) => z.object({
    data: z.array(objectSchema),
    docs: z.object({
      current_page: z.number(),
      per_page: z.number(),
      total: z.number(),
      last_page: z.number(),
    }),
  });

export type GenericInfiniteQueryFunction<
  OutputSchema extends GenericOutputSchema
> = (
  vars: any,
  ctx: { pageParam: number }
) => Promise<
  | z.infer<ReturnType<typeof ApiPayloadResponseSchema<OutputSchema>>>
>;

export type GenericInfiniteQueryDef = InfiniteQueryDef<
  GenericOutputSchema,
  GenericInfiniteQueryFunction<GenericOutputSchema>
>;

export type CreateInfiniteQueryVars<
  OutputSchema extends GenericOutputSchema,
  QueryFn extends GenericInfiniteQueryFunction<OutputSchema> | undefined
> = {
  defaultOptions?: UseInfiniteQueryOptions<GenericQueryDefinition>;
  queryFn?: QueryFn;
  mockFn?: QueryFn;
  output: OutputSchema;
} & SharedCreateVars;

export type InfiniteQueryDef<
  OutputSchema extends GenericOutputSchema,
  QueryFn extends GenericInfiniteQueryFunction<OutputSchema> | undefined
> = CreateInfiniteQueryVars<OutputSchema, QueryFn> & {
  _type: 'infinite-query';
};

export type UseInfiniteQueryOptionsInternal<
  Def extends GenericInfiniteQueryDef
> = Omit<
  UseInfiniteQueryOptions<
    z.infer<Def['output']>,
    ErrorPlaceholder,
    z.infer<Def['output']>
  >,
  'queryKey' | 'queryFn'
>;

export type UseInfiniteQueryResultInternal<
  Output extends GenericOutputSchema,
  ErrorReturn
> = Omit<
  UseInfiniteQueryResult<
    OutputSchemaToInfiniteQueryDataType<Output>,
    ErrorReturn
  >,
  'data'
> & {
  data: z.infer<Output>[];
};

// placeholder
export type UseInfiniteQueryInternal<
  Def extends GenericInfiniteQueryDef,
  ErrorReturn
> = InfiniteQueryVarsFromDefinition<Def> extends undefined
  ? (
    vars?: InfiniteQueryVarsFromDefinition<Def>,
    options?: UseInfiniteQueryOptionsInternal<Def>
  ) => UseInfiniteQueryResultInternal<Def['output'], ErrorReturn>
  : (
    vars: InfiniteQueryVarsFromDefinition<Def>,
    options?: UseInfiniteQueryOptionsInternal<Def>
  ) => UseInfiniteQueryResultInternal<Def['output'], ErrorReturn>;

export type InfiniteQueryPrefetchOptionsInternal = Omit<
  Parameters<QueryClient['prefetchQuery']>[0],
  'queryKey' | 'queryFn'
>;

export interface InfiniteQueryApiFromDef<
  Def extends GenericInfiniteQueryDef,
  ErrorReturn
> {
  useInfiniteQuery: UseInfiniteQueryInternal<Def, ErrorReturn>;

  /**
   * Prefetches the first patch of items
   */
  prefetch: (
    vars: InfiniteQueryVarsFromDefinition<Def> extends undefined
      ? void
      : InfiniteQueryVarsFromDefinition<Def>,
    options?: InfiniteQueryPrefetchOptionsInternal
  ) => Promise<void>;
  invalidate: (vars?: InfiniteQueryVarsFromDefinition<Def>) => void;
  queryFn: ExposedInfiniteQueryFnType<Def>;
  deleteItem: (
    vars: InfiniteQueryVarsFromDefinition<Def> extends undefined
      ? void
      : InfiniteQueryVarsFromDefinition<Def>,
    matcher: (item: z.infer<Def['output']>) => boolean
  ) => void;
  setData: (
    vars: (InfiniteQueryVarsFromDefinition<Def> extends undefined
      ? void
      : InfiniteQueryVarsFromDefinition<Def>) | undefined,
    matcher: (item: z.infer<Def['output']>) => z.infer<Def['output']>
  ) => void;
  _type: 'infinite-query';
}

export type OutputSchemaToInfiniteQueryDataType<
  ZodSchema extends GenericOutputSchema
// eslint-disable-next-line @typescript-eslint/ban-types
> = z.infer<ZodSchema>[] & {};

export type InfiniteQueryInputVars<
  QueryFn extends GenericInfiniteQueryFunction<any> | undefined
> = FirstFunctionParameter<NonNullable<QueryFn>>;

export type InfiniteQueryVarsFromDefinition<
  QueryDefinition extends GenericInfiniteQueryDef
> = AnyFunction extends QueryDefinition['mockFn']
  ? FirstFunctionParameter<NonNullable<QueryDefinition['mockFn']>>
  : AnyFunction extends QueryDefinition['queryFn']
  ? FirstFunctionParameter<NonNullable<QueryDefinition['queryFn']>>
  : never;

export function infiniteQuery<
  OutputSchema extends GenericOutputSchema,
  QueryFn extends GenericInfiniteQueryFunction<OutputSchema>
>(
  vars: CreateInfiniteQueryVars<OutputSchema, QueryFn>,
): InfiniteQueryDef<OutputSchema, QueryFn> {
  return {
    ...vars,
    _type: 'infinite-query',
  };
}

export type ExposedInfiniteQueryFnType<
  QueryDefinition extends GenericInfiniteQueryDef
> = InfiniteQueryVarsFromDefinition<QueryDefinition> extends undefined
  ? (
    vars?: InfiniteQueryVarsFromDefinition<QueryDefinition>
  ) => Promise<z.infer<QueryDefinition['output']>>
  : (
    vars: InfiniteQueryVarsFromDefinition<QueryDefinition>
  ) => Promise<z.infer<QueryDefinition['output']>>;

export interface InfiniteQueryFnContext {
  pageParam: number;
}

export function infiniteQueryApiFromDefinition<
  OutputSchema extends GenericOutputSchema,
  QueryFn extends GenericInfiniteQueryFunction<OutputSchema> | undefined,
  ErrorReturn
>({
  def,
  path,
  options,
}: {
  def: InfiniteQueryDef<OutputSchema, QueryFn>;
  path: string[];
  options: CreateApiOptions<ErrorReturn>;
}): InfiniteQueryApiFromDef<
  InfiniteQueryDef<OutputSchema, QueryFn>,
  ErrorReturn
> {
  type Def = InfiniteQueryDef<OutputSchema, QueryFn>;
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

  function _makeQueryFn(
    vars: InfiniteQueryInputVars<QueryFn>,
    ctx: InfiniteQueryFnContext,
  ) {
    return async () => {
      const shouldUseMock = mergedDebug.mockEnabled && mergedCreateApiOptions.isDev;
      const willAutoMock = shouldUseMock && !def.mockFn;
      const parseSchema = ApiPayloadResponseSchema(def.output);

      const result = shouldUseMock
        ? await callWithVars({
          fn: def.mockFn,
          vars,
          ctx,
          errorMessage: 'No mockFn function passed to query().',
          path,
          options: mergedCreateApiOptions,
        })
        : await callWithVars({
          fn: def.queryFn,
          vars,
          ctx,
          errorMessage: 'No queryFn passed to query().',
          path,
          options: mergedCreateApiOptions,
        });

      if (willAutoMock) {
        // Skip parsing for auto mock because it applies effects and parsing fails
        return result;
      }

      return parseReturnValue({
        schema: parseSchema,
        val: result,
        path,
        type: 'query',
        options: mergedCreateApiOptions,
        vars,
      });
    };
  }

  const _useInfiniteQuery: UseInfiniteQueryInternal<Def, ErrorReturn> = ((
    vars: InfiniteQueryVarsFromDefinition<Def>,
    options?: UseInfiniteQueryOptions<Def>,
  ) => {
    const query = useInfiniteQuery({
      queryKey: [...baseQueryKey, ...queryKeyPartFromVars(vars as any)],
      queryFn: (context: InfiniteQueryFnContext) => _makeQueryFn(vars, { pageParam: context.pageParam ?? 1 })(),
      getNextPageParam: (lastPage: any) => {
        if (lastPage.docs.current_page < lastPage.docs.last_page && lastPage.docs.current_page) {
          return lastPage.docs.current_page + 1;
        }
      },
      ...(def.defaultOptions as any),
      ...(options as any),
    });

    const allItems = query.data?.pages
      .map((payloadResponse) => {
        if ('data' in (payloadResponse as object)) {
          const { data } = payloadResponse as { data: unknown[] };

          return data;
        }

        // should never happen
        throw new Error('APIError - Bad shape?');
      })
      .flat();

    return {
      ...query,
      data: allItems,
    };
  }) as any;

  const exposedQueryFn: ExposedInfiniteQueryFnType<Def> = (async (
    vars: InfiniteQueryVarsFromDefinition<Def>,
    ctx: InfiniteQueryFnContext,
  ) => {
    const fn = _makeQueryFn(vars, ctx);

    return await fn();
  }) as any;

  return {
    setData: (
      vars,
      mapper,
    ) => {
      queryClient.setQueriesData<InfiniteData<unknown[]>>(
        {
          predicate: (q) => {
            const filter = vars ? [...baseQueryKey, ...queryKeyPartFromVars(vars)] : baseQueryKey;

            return filter.every((el) => q.queryKey.includes(el));
          },
        },
        (oldData) => {
          if (!oldData) {
            return;
          }

          const newPages = oldData?.pages.map((payloadResponse) => {
            if ('data' in (payloadResponse as object)) {
              const { data } = payloadResponse as any as { data: unknown[] };

              return {
                ...payloadResponse,
                data: mapper(data),
              } as any;
            }

            // should never happen
            throw new Error('APIError - Bad shape?');
          });

          return { ...oldData, pages: newPages };
        },
      );
    },
    deleteItem: (vars, matcher) => {
      const queryKey = [...baseQueryKey, ...queryKeyPartFromVars(vars as any)];

      queryClient.setQueryData<InfiniteData<unknown[]>>(queryKey, (oldData) => {
        if (!oldData) {
          return;
        }

        const newPages = oldData?.pages.map((payloadResponse) => {
          if ('data' in (payloadResponse as object)) {
            const { data } = payloadResponse as any as { data: unknown[] };

            return {
              ...payloadResponse,
              data: data.filter((doc) => !matcher(doc)),
            } as any;
          }

          // should never happen
          throw new Error('APIError - Bad shape?');
        });

        return { ...oldData, pages: newPages };
      });
    },
    useInfiniteQuery: _useInfiniteQuery,
    invalidate: (vars?: InfiniteQueryInputVars<QueryFn>) => {
      if (vars) {
        queryClient.invalidateQueries([
          ...baseQueryKey,
          ...queryKeyPartFromVars(vars),
        ] as any);
      } else {
        queryClient.invalidateQueries(baseQueryKey as any);
      }
    },
    prefetch: async (vars, options) => {
      await queryClient.prefetchInfiniteQuery({
        queryKey: [...baseQueryKey, ...queryKeyPartFromVars(vars as any)],
        queryFn: _makeQueryFn(vars, { pageParam: 0 }),
        ...options,
      } as any);
    },
    queryFn: exposedQueryFn,
    _type: 'infinite-query',
  };
}
