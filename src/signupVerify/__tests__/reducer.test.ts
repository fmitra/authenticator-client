import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS
} from '@authenticator/signupVerify/constants';
import reducer from '@authenticator/signupVerify/reducer';

describe('SignupVerify Reducer Test', (): void => {
  test('handles REQUEST', (): void => {
    const currentState = {
      error: null,
      isRequesting: false,
      isVerified: false,
    };
    expect(reducer(currentState, { type: REQUEST })).toEqual({
      error: null,
      isRequesting: true,
      isVerified: false,
    });
  });

  test('handles REQUEST_ERROR', (): void => {
    const currentState = {
      error: null,
      isRequesting: false,
      isVerified: false,
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
      isVerified: false,
    });
  });

  test('handles REQUEST_SUCCESS', (): void => {
    const currentState = {
      error: null,
      isRequesting: false,
      isVerified: false,
    };
    expect(reducer(currentState, { type: REQUEST_SUCCESS })).toEqual({
      error: null,
      isRequesting: false,
      isVerified: true,
    });
  });
});
