import { h } from 'preact';
import { deep } from 'preact-render-spy';

import { FormErrors, Errors } from '@authenticator/errors';

describe('Errors Test', (): void => {
  test('renders all error messages', (): void => {
    const errors = {
      password: {
        message: 'Password must be 6 characters or more',
        code: 'min_characters',
      },
      username: {
        message: 'Username already exists',
        code: 'duplicate',
      },
    };
    const formErrors = new FormErrors(errors);
    const component = deep(<Errors class='signup-errors' errors={formErrors} />);
    expect(component.find('.error__message').length).toBe(2);
  });

  test('renders no error message', (): void => {
    const errors = {};
    const formErrors = new FormErrors(errors);
    const component = deep(<Errors class='signup-errors' errors={formErrors} />);
    expect(component.find('.error__message').length).toBe(0);
  });
});
