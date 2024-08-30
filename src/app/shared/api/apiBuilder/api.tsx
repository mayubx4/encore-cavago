/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type QueryClient } from '@tanstack/react-query';

import { ZodError } from 'zod';
import {
  type GenericInfiniteQueryDef,
  type InfiniteQueryApiFromDef,
  infiniteQueryApiFromDefinition,
} from './infinite-query';
import {
  type GenericMutationDefinition,
  type MutationApiFromDefinition,
  mutationApiFromDefinition,
} from './mutation';
import {
  type GenericQueryDefinition,
  type QueryApiFromDefinition,
  queryApiFromDefinition,
} from './query';

// Create api
export interface GenericApiDefinition {
  [key: string]:
  | GenericQueryDefinition
  | GenericMutationDefinition
  | GenericInfiniteQueryDef
  | GenericApiDefinition;
}

/**
 * Translates an API definition type into a React component ready api.
 */
export type Api<ApiDefinition extends GenericApiDefinition, ErrorReturn> = {
  [key in keyof ApiDefinition]: ApiDefinition[key] extends GenericQueryDefinition
  ? QueryApiFromDefinition<ApiDefinition[key], ErrorReturn>
  : ApiDefinition[key] extends GenericMutationDefinition
  ? MutationApiFromDefinition<ApiDefinition[key], ErrorReturn>
  : ApiDefinition[key] extends GenericInfiniteQueryDef
  ? InfiniteQueryApiFromDef<ApiDefinition[key], ErrorReturn>
  : ApiDefinition[key] extends GenericApiDefinition
  ? Api<ApiDefinition[key], ErrorReturn>
  : never;
} & {
  invalidate: () => void;
};

/**
 * Takes an API definition and generates the api.
 */
function apiFromDefinition<
  ApiDefinition extends GenericApiDefinition,
  ErrorReturn
>({
  api,
  path,
  options,
}: {
  api: ApiDefinition;
  path: string[];
  options: CreateApiOptions<ErrorReturn>;
}): Api<ApiDefinition, ErrorReturn> {
  const r: Partial<Api<ApiDefinition, ErrorReturn>> = {};
  for (const key of Object.keys(api)) {
    const val = api[key];
    if (val._type === 'query') {
      r[key as keyof typeof r] = queryApiFromDefinition({
        def: val,
        path: [...path, key],
        options,
      }) as any;
    } else if (val._type === 'mutation') {
      r[key as keyof typeof r] = mutationApiFromDefinition({
        def: val,
        path: [...path, key],
        options,
      }) as any;
    } else if (val._type === 'infinite-query') {
      r[key as keyof typeof r] = infiniteQueryApiFromDefinition({
        def: val,
        path: [...path, key],
        options,
      }) as any;
    } else {
      // It's a nested API
      r[key as keyof typeof r] = apiFromDefinition({
        api: val,
        path: [...path, key],
        options,
      }) as any;
    }
  }

  return {
    ...r,
    invalidate: () => {
      options.queryClient.invalidateQueries(path as any);
    },
  } as Api<ApiDefinition, ErrorReturn>;
}

export type APIBuilderLogFunction = ({
  message,
  path,
}: {
  message: string;
  path: string[];
}) => void;

export type APIBuilderGetErrorLogMessage<ErrorReturn> = ({
  path,
  error,
}: {
  path: string[];
  error: ErrorReturn;
}) => void;

export interface ApiBuilderDebugOptions {
  logVars: boolean;
  logOutputs: boolean;
  logFn: APIBuilderLogFunction;

  /**
   * Simulates a network delay when mocking is enabled. If it is 0, no delay will be simulated.
   */
  simulateNetworkDelayMs: number;
  mockEnabled: boolean;

  /**
   * Custom mapper for auto generated mock data, doesn't do anything
   * if a mockFn is passed for that end point.
   */
}

// TODO make sure debug is completely disabled in __DEV__

const defaultDebugOptions: ApiBuilderDebugOptions = {
  logVars: false,
  logOutputs: false,
  logFn: ({ message }) => console.log(message),
  simulateNetworkDelayMs: 0,
  mockEnabled: true,
};

export interface ParseErrorVars {
  error: ZodError;
  path: string;
  vars: object | undefined;
  output: object | undefined;
}

export type ApiBuildMutationProfiler = (vars: {
  path: string[];
}) => Promise<() => void>;
export interface CreateApiOptions<ErrorReturn> {
  queryClient: QueryClient;

  /**
   * A handler function for converting any possible errors into something usable by the application
   */
  parseError: (vars: ParseErrorVars) => ErrorReturn;

  /**
   * Takes an error message and returns the thing that should be printed for that error message.
   */
  logError?: APIBuilderGetErrorLogMessage<ErrorReturn>;

  /**
   * Called when there is an error
   */
  onError: (error: ErrorReturn) => void;
  isDev?: boolean;
  debug?: Partial<ApiBuilderDebugOptions>;
  basePath?: string[];
  mutationProfiler?: ApiBuildMutationProfiler;
}

/**
 * This is called on the root API definition object to convert it into the corresponding hooks.
 * @param options Options for creating the API.
 * @param api The API definition, created using mutation() and query()
 * @returns An api that can be used in components.
 * @example
 * ```tsx
 * const queryClient = new QueryClient();
 * const api = createApi({queryClient, mockEnabled: false}, {
 *  getPosts: query({
 *    output: PostSchema.array(),
 *    mockFn: async () => posts,
 *    queryFn: async () => {
 *      return (await axios.get('/posts/')).data;
 *    }
 *  }),
 *  createPost: mutation({
 *    output: PostSchema,
 *    mockFn: async (vars: {text: string}) => {
 *      return {
 *        id: 0,
 *        text: vars.text,
 *        likes: 0
 *      }
 *    },
 *    mutationFn: async (vars: {text: string}) => {
 *      return (await axios.post('/posts', vars)).data;
 *    }
 *  })
 * })
 * ```
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const defaultIsDev: boolean = typeof __DEV__ === 'undefined' ? true : __DEV__;

export function createApi<
  ApiDefinition extends GenericApiDefinition,
  ErrorReturn
>(options: CreateApiOptions<ErrorReturn>, api: ApiDefinition) {
  const mergedDebugOptions: ApiBuilderDebugOptions = {
    ...defaultDebugOptions,
    ...options.debug,
  };

  return apiFromDefinition<ApiDefinition, ErrorReturn>({
    api,
    path: options.basePath ? options.basePath : [],
    options: {
      isDev: defaultIsDev,
      ...options,
      debug: mergedDebugOptions,
    },
  });
}

/**
 * A helper to create a sub API. Doesn't actually do anything other than type checking
 * but is consistent with the rest of the API so can be nice to use.
 * @param def An api definition.
 * @returns The same ApiDefinition
 */
export function subApi<ApiDefinition extends GenericApiDefinition>(
  def: ApiDefinition,
) {
  return def;
}

export type QueryOutput<
  Query extends { queryFn: (...vars: any[]) => Promise<any> }
> = Query extends { queryFn: (...vars: any[]) => Promise<infer Output> }
  ? // eslint-disable-next-line @typescript-eslint/ban-types
  Output
  : never;

export type QueryInput<
  Query extends { queryFn: (...vars: any[]) => Promise<any> }
> = Query extends { queryFn: (vars: infer Input) => Promise<any> }
  ? // eslint-disable-next-line @typescript-eslint/ban-types
  Input
  : never;

export type InfiniteQueryItemType<
  Query extends (...vars: any[]) => { data: unknown[] }
> = Query extends (...vars: any[]) => { data: infer ItemType }
  ? ItemType extends unknown[]
  ? ItemType[number]
  : never
  : never;
