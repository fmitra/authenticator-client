import { NullAppError, AppError } from '@authenticator/errors';

/**
 * FormErrors maintains a mapping of error messages
 * to specific form fields/ids.
 */
export default class FormErrors {
  errors: {[key: string]: AppError};

  constructor(errors: {[key: string]: AppError} = {}) {
    this.errors = errors;
  }

  /**
   * Returns true if no error exists
   */
  get ok(): boolean {
    return !Boolean(Object.keys(this.errors).length);
  }

  /**
   * Returns true if errors exists
   */
  get notOk(): boolean {
    return Boolean(Object.keys(this.errors).length);
  }

  /**
   * Retrieves an error by form field/key
   */
  get(key: string): NullAppError {
    return this.errors[key] || null;
  }

  /**
   * Updates an error for a specific form field/key
   */
  update(error: NullAppError, key: string): FormErrors {
    if (error) {
      this.errors[key] = error;
    }

    if (!error && this.errors[key]) {
      delete this.errors[key];
    }

    return this;
  }

  /**
   * Clears all form errors
   */
  clear(): FormErrors {
    this.errors = {};
    return this;
  }

  /**
   * Returns the first available error
   */
  any(): NullAppError {
    const keys = Object.keys(this.errors);
    const firstKey = keys.length && keys[0];
    if (firstKey) {
      return this.errors[firstKey]
    }
    return null;
  }
};
