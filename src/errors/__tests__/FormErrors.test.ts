import FormErrors from '@authenticator/errors/FormErrors';

describe('FormErrors Test', (): void => {
  test('organizes errors by key', (): void => {
    const formErrors = new FormErrors();
    const error = {
      message: 'Something bad happened',
      code: 'invalid_input',
    };
    formErrors.update(error, 'username');
    expect(formErrors.errors).toEqual({
      username: error,
    });

    formErrors.update(error, 'password');
    expect(formErrors.errors).toEqual({
      password: error,
      username: error,
    });
  });

  test('removes an error by key', (): void => {
    const formErrors = new FormErrors();
    const error = {
      message: 'Something bad happened',
      code: 'invalid_input',
    };
    formErrors.update(error, 'username');
    formErrors.update(error, 'password');
    expect(formErrors.errors).toEqual({
      username: error,
      password: error,
    });

    formErrors.update(null, 'username');
    expect(formErrors.errors).toEqual({
      password: error,
    });
  });

  test('`ok` checks for no errors found', (): void => {
    const formErrors = new FormErrors();
    expect(formErrors.ok).toBe(true);

    const error = {
      message: 'Something bad happened',
      code: 'invalid_input',
    };
    formErrors.update(error, 'username');
    expect(formErrors.ok).toBe(false);
  });

  test('`notOk` checks for no errors found', (): void => {
    const formErrors = new FormErrors();
    expect(formErrors.notOk).toBe(false);

    const error = {
      message: 'Something bad happened',
      code: 'invalid_input',
    };
    formErrors.update(error, 'username');
    expect(formErrors.notOk).toBe(true);
  });

  test('`clear` removes all errors', (): void => {
    const formErrors = new FormErrors({
      password: {
        message: 'Must be 8 characters',
        code: 'incorrect_length',
      },
      username: {
        message: 'Username already taken',
        code: 'already_exists',
      },
    });
    expect(formErrors.get('password')).toEqual({
      message: 'Must be 8 characters',
      code: 'incorrect_length',
    });

    formErrors.clear()
    expect(formErrors.get('password')).toBe(null);
    expect(formErrors.get('username')).toBe(null);
    expect(formErrors.ok).toBe(true);
  });

  test('`any` returns first available error', (): void => {
    const formErrors = new FormErrors({
      password: {
        message: 'Must be 8 characters',
        code: 'incorrect_length',
      },
    });
    expect(formErrors.any()).toEqual({
      message: 'Must be 8 characters',
      code: 'incorrect_length',
    });
  });
});
