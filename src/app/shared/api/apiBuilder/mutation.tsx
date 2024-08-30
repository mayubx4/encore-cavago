/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from '@tanstack/react-query';
import { type z } from 'zod';

import { type CreateApiOptions } from './api';
import { type SharedCreateVars } from './shared-options';
import {
  type AnyFunction,
  callWithVars,
  type ErrorPlaceholder,
  type FirstFunctionParameter,
  type GenericOutputSchema,
  parseReturnValue,
} from './utils';

export type GenericMutationFn<_OutputSchema extends GenericOutputSchema> = (
  vars: any
) => Promise<z.input<_OutputSchema>>;

export type GenericMockMutationFn<OutputSchema extends GenericOutputSchema> = (
  vars: any
) => Promise<z.input<OutputSchema>>;

export type CreateMutationVars<
  OutputSchema extends GenericOutputSchema,
  MutationFn extends GenericMutationFn<OutputSchema> | undefined
> = {
  mutationFn?: MutationFn;
  mockFn?: MutationFn;
  output: OutputSchema;
  defaultOptions?: UseMutationOptionsInternal<GenericMutationDefinition>;
} & SharedCreateVars;

export type MutationDefinition<
  OutputSchema extends GenericOutputSchema,
  MutationFn extends GenericMutationFn<OutputSchema> | undefined
> = CreateMutationVars<OutputSchema, MutationFn> & {
  _type: 'mutation';
};

export type GenericMutationDefinition = MutationDefinition<
  GenericOutputSchema,
  GenericMutationFn<any> | undefined
>;

export type MutationFnVarsFromDefinition<
  Definition extends GenericMutationDefinition
> = AnyFunction extends Definition['mockFn']
  ? FirstFunctionParameter<NonNullable<Definition['mockFn']>>
  : AnyFunction extends Definition['mutationFn']
  ? FirstFunctionParameter<NonNullable<Definition['mutationFn']>>
  : never;

export type UseMutationOptionsInternal<
  MutationDefinition extends GenericMutationDefinition
> = Omit<
  UseMutationOptions<
    z.infer<MutationDefinition['output']>,
    ErrorPlaceholder,
    MutationFnVarsFromDefinition<MutationDefinition>
  >,
  'mutationKey' | 'mutationFn'
>;

export type UseMutationResultInternal<
  MutationDefinition extends GenericMutationDefinition,
  ErrorReturn
> = UseMutationResult<
  z.infer<MutationDefinition['output']>,
  ErrorReturn,
  MutationFnVarsFromDefinition<MutationDefinition> extends undefined
    ? void
    : MutationFnVarsFromDefinition<MutationDefinition>
>;

export type UseMutationInternal<
  MutationDefinition extends GenericMutationDefinition,
  ErrorReturn
> = (
  options?: UseMutationOptionsInternal<MutationDefinition>
) => UseMutationResultInternal<MutationDefinition, ErrorReturn>;

export interface MutationApiFromDefinition<
  MutationDefinition extends GenericMutationDefinition,
  ErrorReturn
> {

  /**
   * A Tanstack query useMutation hook.
   * @param options Optional "options" object, see Tanstack docs for all available options.
   * @example
   * ```tsx
   * const api = createApi({
   *  // ...
   * },{
   *  createPost: mutation({
   *    output: PostSchema,
   *    mutationFn: async (text: string) => {
   *      return (await axios.post('/post')).data
   *    },
   *  })
   * })
   *
   * // In a component
   * const createPostMutation = api.createPost.useMutation({
   *  onSuccess: (post)=>{
   *    console.log("Success!")
   *    console.log(post)
   *  }
   * })
   *
   * function onCreatePostPress() {
   *  createPostMutation.mutate("Some post text")
   * }
   * ```
   */
  useMutation: UseMutationInternal<MutationDefinition, ErrorReturn>;

  /**
   * Call the mutationFn directly. Will parse and use the mock function if mocking is turned on.
   */
  mutationFn: ExposedMutationFn<MutationDefinition>;

  _type: 'mutation';
}

export type ExposedMutationFn<Def extends GenericMutationDefinition> =
  MutationFnVarsFromDefinition<Def> extends undefined
    ? (
        vars?: MutationFnVarsFromDefinition<Def>
      ) => Promise<z.infer<Def['output']>>
    : (
        vars: MutationFnVarsFromDefinition<Def>
      ) => Promise<z.infer<Def['output']>>;

export function mutationApiFromDefinition<
  OutputSchema extends GenericOutputSchema,
  MutationFn extends GenericMutationFn<any> | undefined,
  ErrorReturn
>({
  def,
  path,
  options: createApiOptions,
}: {
  def: MutationDefinition<OutputSchema, MutationFn>;
  path: string[];
  options: CreateApiOptions<ErrorReturn>;
}): MutationApiFromDefinition<
  MutationDefinition<OutputSchema, MutationFn>,
  ErrorReturn
> {
  type Def = MutationDefinition<OutputSchema, MutationFn>;
  const mergedDebug = {
    ...createApiOptions.debug,
    ...def.debug,
  };

  const mergedCreateApiOptions = {
    ...createApiOptions,
    debug: mergedDebug,
  };

  const mutationFn = async (vars: MutationFnVarsFromDefinition<Def>) => {
    const finishProfiling = await createApiOptions.mutationProfiler?.({
      path,
    });
    const shouldUseMock = mergedDebug.mockEnabled && mergedCreateApiOptions.isDev;
    const willAutoMock = shouldUseMock && !def.mockFn;
    const result = shouldUseMock
      ? await callWithVars({
        fn: def.mockFn,
        errorMessage: 'No mockFn passed to mutation().',
        vars,
        path,
        options: mergedCreateApiOptions,
      })
      : await callWithVars({
        fn: def.mutationFn,
        errorMessage: 'No mutationFn passed to mutation().',
        vars,
        path,
        options: mergedCreateApiOptions,
      });

    finishProfiling?.();

    if (willAutoMock) {
      // Skip parsing for auto mock because it applies effects and parsing fails
      return result;
    }

    const res = await parseReturnValue({
      schema: def.output,
      val: result,
      type: 'mutation',
      path,
      options: mergedCreateApiOptions,
      vars,
    });

    return res;
  };
  const _useMutation: UseMutationInternal<Def, ErrorReturn> = ((
    options: UseMutationOptionsInternal<Def>,
  ) => useMutation(mutationFn as any, {
    mutationKey: [...path],
    ...(def.defaultOptions as any),
    ...(options as any),
  })) as any;

  return {
    useMutation: _useMutation,
    mutationFn: mutationFn as any,
    _type: 'mutation',
  };
}

/**
 * Helper to create a mutation definition
 */
export function mutation<
  OutputSchema extends GenericOutputSchema,
  MutationFn extends GenericMutationFn<OutputSchema> | undefined = undefined
>(
  vars: CreateMutationVars<OutputSchema, MutationFn>,
): MutationDefinition<OutputSchema, MutationFn> {
  return { ...vars, _type: 'mutation' };
}
