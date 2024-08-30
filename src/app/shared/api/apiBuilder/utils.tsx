/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { AxiosError } from 'axios';
import { ZodError, type z, type ZodSchema } from 'zod';
import { type CreateApiOptions } from './api';

function removeBackslashes(v: string) {
  return v.replace(/\\/g, '');
}

export type GenericOutputSchema = ZodSchema;

export type ErrorPlaceholder = unknown;

export type FirstFunctionParameter<Fn extends AnyFunction> = Parameters<Fn>[0];

export type AnyFunction = (...vars: any[]) => any;

export type RemoveUndefinedValues<T> = T[{
  [P in keyof T]: T[P] extends undefined ? never : P;
}[keyof T]];

export type UpdateFunctionParameters<Fn extends AnyFunction, Parameter> = (
  param: Parameter
) => ReturnType<Fn>;

/**
 * Calls an async function, throwing an error and logging a message if it's undefined.
 */
export async function callWithVars<
  Fn extends AnyFunction | undefined,
  ErrorReturn,
  CtxType
>({
  fn,
  vars,
  errorMessage,
  path,
  options,
  ctx,
  delayFn = delay,
}: {
  fn: Fn;
  vars: FirstFunctionParameter<NonNullable<Fn>>;
  errorMessage: string;
  ctx?: CtxType;
  path: string[];
  options: CreateApiOptions<ErrorReturn>;
  delayFn?: (ms: number) => Promise<void>;
}) {
  if (!fn) {
    throw new Error(`Error - ${errorMessage} At path: ${path.join('.')}`);
  }
  if (options.isDev) {
    if (options.debug?.logVars) {
      options.debug.logFn?.({
        path,
        message: `with vars:\n${JSON.stringify(vars, null, 2)}`,
      });
    }
    if (options.debug?.simulateNetworkDelayMs && options.debug.mockEnabled) {
      await delayFn(options.debug.simulateNetworkDelayMs);
    }
  }

  try {
    const result = await fn(vars, ctx);
    if (typeof result === 'object' && result !== null && 'errors' in result) {
      // here the request is successful but there is an "errors" property in response.
      // this only happens with GQL
      for (const error of result.errors) {
        if (error.message === 'You are not allowed to perform this action.') {
          throw new GQLUnauthedError(result.errors);
        }
      }

      throw new GQLQueryError(result.errors);
    }

    return result;
  } catch (error) {
    const parsedError = handleError({
      options,
      error,
      path,
      vars,
      output: undefined,
    });

    throw parsedError;
  }
}

/**
 * Prints helpful error message if parse fails.
 */
export async function parseReturnValue<
  Schema extends GenericOutputSchema,
  ErrorReturn
>({
  schema,
  val,
  vars,
  path,
  type,
  options,
}: {
  schema: Schema;
  val: any;
  vars: object | undefined;
  path: string[];
  type: 'query' | 'mutation';
  options: CreateApiOptions<ErrorReturn>;
}) {
  if (options.isDev && options.debug?.logOutputs) {
    options.debug.logFn?.({
      path,
      message: `returned:\n${JSON.stringify(val, null, 2)}`,
    });
  }

  try {
    return schema.parse(val) as z.infer<Schema>;
  } catch (e) {
    e.errors.forEach((error) => {
      console.error(`Path: ${error.path.join(' -> ')}, Message: ${error.message}`);
    });
    console.log(
      `Failed to parse response for  ${type} at path "${path.join('.')}"`,
    );
    e.errors.forEach((err) => {
      console.log(`Path: ${err.path} Message: ${err.message}`);
    });

    handleError({
      path,
      vars,
      error: e,
      options,
      output: val,
    });
  }
}

function handleError<ErrorReturn>({
  options,
  error,
  path,
  vars,
  output,
}: {
  options: CreateApiOptions<ErrorReturn>;
  error: unknown;
  path: string[];
  vars: object | undefined;
  output: object | undefined;

  // never tells ts it throws an error
}): never {
  const parsedError = options.parseError({
    error,
    path: path.join('.'),
    vars,
    output,
  });
  options.onError(parsedError);
  options.logError?.({
    path,
    error: parsedError,
  });
  throw parsedError;
}

export type FunctionWithOneParameter = (param: any) => any;

export async function delay(ms: number) {
  await new Promise((res) => setTimeout(res, ms));
}

/**
 * Invalid GQL query was passed or the server errored
 */
export class GQLQueryError extends Error {
  constructor(errors: unknown) {
    const msg = removeBackslashes(JSON.stringify(errors, null, 2));
    super(msg);
    this.message = `GQL Query error can be caused by:\n(1) Front end querying for fields that don't exist.\n(2) Backend erroring when resolving the query\n${msg}`;
    this.name = 'GQLQueryError';
  }
}

export class GQLUnauthedError extends AxiosError {
  constructor(errors: unknown) {
    const msg = removeBackslashes(JSON.stringify(errors, null, 2));
    super(msg);
    this.message = `GQL Query error can be caused by:\n(1) Front end querying for fields that don't exist.\n(2) Backend erroring when resolving the query\n${msg}`;
    this.name = 'GQLUnauthedError';
    this.status = 401;
  }
}
