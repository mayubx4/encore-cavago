import { ZodError } from 'zod';
import { pascalToKebab } from './utils';

class UnauthorizedError extends Error {
  constructor({ message }: { message: string }) {
    super(message);
    this.name = 'Unauthorized';
  }
}

class InternalServerError extends Error {
  constructor({ message }: { message: string }) {
    super(message);
    this.name = 'InternalServerError';
  }
}

class BadRequestError extends Error {
  constructor({ message }: { message: string }) {
    super(message);
    this.name = 'InternalServerError';
  }
}

export function handleApiError(error: any, customErrorHandlers: ((error: any) => void)[] = []): never {
  for (const handler of customErrorHandlers) {
    handler(error);
  }

  const message = error.response?.data?.error;

  if (error.code === '401') {
    throw new UnauthorizedError({ message: message ?? 'Unauthorized access' });
  }

  if (error.code === '422') {
    throw new BadRequestError({ message: message ?? 'Invalid data provided' });
  }

  if (error.code === '500') {
    throw new InternalServerError({ message: message ?? 'Internal Server Error' });
  }

  throw new Error('Unknown error occurred');
}

type ClassType = new (...args: any[]) => any;

export function parseApiErrors({ error }: { error: unknown }, errorClasses: { [key: string]: ClassType } = {}) {
  const allErrorClasses = { ...errorClasses, UnauthorizedError, InternalServerError, BadRequestError };

  for (const ErrorClass of Object.values(allErrorClasses)) {
    if (error instanceof ErrorClass) {
      return {
        type: `api-error-${pascalToKebab(ErrorClass.name)}`,
        message: error.message,
      };
    }
  }

  if (error instanceof ZodError) {
    return {
      type: 'api-parse-error',
      message: error.issues.map((i) => `
      code: ${i.code}\n
      expected: ${i.expected}\n
      message: ${i.message}\n
      path: [${i.path.join(',')}]\n
      received: ${i.received}\n
      `),
    };
  }

  return {
    type: 'api-error-unknown',
    message: 'unknown error',
  };
}
