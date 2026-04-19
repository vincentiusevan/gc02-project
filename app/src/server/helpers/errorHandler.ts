import { ZodError } from 'zod';
import { CustomError } from './CustomError';

interface IErrorResult {
  message: string;
  status: number;
}

export function errorHandler(err: unknown): IErrorResult {
  if (err instanceof ZodError) {
    const messages = err.issues.map((issue) => {
      return `${issue.path} - ${issue.message}`;
    });

    return { message: messages.join('; '), status: 400 };
  }

  if (err instanceof CustomError) {
    return { message: err.message, status: err.status };
  }

  if (err instanceof Error) {
    return { message: err.message, status: 400 };
  }

  return { message: 'ISE', status: 500 };
}
