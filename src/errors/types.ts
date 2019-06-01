export interface AppError {
  code: string;
  message: string;
};

export type NullAppError = AppError | null;
