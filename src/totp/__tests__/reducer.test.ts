import {
  REQUEST,
  REQUEST_ERROR,
  SECRET_CREATED
} from '@authenticator/totp/constants';
import reducer from '@authenticator/totp/reducer';

describe('TOTP Reducer Test', (): void => {
  test('handles REQUEST', (): void => {
    const currentState = {
      totp: '',
      error: null,
      isEnabled: false,
      isRequesting: false,
    };
    expect(reducer(currentState, { type: REQUEST })).toEqual({
      totp: '',
      error: null,
      isEnabled: false,
      isRequesting: true,
    });
  });

  test('handles REQUEST_ERROR', (): void => {
    const currentState = {
      totp: '',
      error: null,
      isEnabled: false,
      isRequesting: false,
    };
    const error = {
      message: 'Whoops something bad happened',
      code: 'error_code',
    }
    expect(reducer(currentState, { type: REQUEST_ERROR, error: error })).toEqual({
      error: {
        message: 'Whoops something bad happened',
        code: 'error_code',
      },
      isRequesting: false,
      isEnabled: false,
      totp: '',
    });
  });

  test('handles SECRET_CREATED', (): void => {
    const currentState = {
      totp: '',
      error: null,
      isEnabled: false,
      isRequesting: false,
    };
    expect(reducer(currentState, { type: SECRET_CREATED, totp: 'otpauth://totp' })).toEqual({
      totp: 'otpauth://totp',
      error: null,
      isEnabled: false,
      isRequesting: false,
    });
  });
});
