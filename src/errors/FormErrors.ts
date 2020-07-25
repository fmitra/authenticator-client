import { NullAppError, AppError } from '@authenticator/errors';

export default class FormErrors {
  errors: {[key: string]: AppError};

  constructor(errors: {[key: string]: AppError} = {}) {
    this.errors = errors;
  }

  get ok(): boolean {
    return !Boolean(Object.keys(this.errors).length);
  }

  get notOk(): boolean {
    return Boolean(Object.keys(this.errors).length);
  }

  get(key: string): NullAppError {
    return this.errors[key] || null;
  }

  update(error: NullAppError, key: string): FormErrors {
    if (error) {
      this.errors[key] = error;
    }

    if (!error && this.errors[key]) {
      delete this.errors[key];
    }

    return this;
  }
};
