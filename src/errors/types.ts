/**
 * AppError defines the error format expected
 * for all error handling.
 */
export interface AppError {
  code: string;
  message: string;
};

export type NullAppError = AppError | null;
