import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS
} from '@authenticator/totpDisable/constants';
import reducer from '@authenticator/totpDisable/reducer';

describe('TOTPDisable Reducer Test', (): void => {
  test('handles REQUEST', (): void => {
    const currentState = {
      error: null,
      isDisabled: false,
      isRequesting: false,
    };
    expect(reducer(currentState, { type: REQUEST })).toEqual({
      error: null,
      isDisabled: false,
      isRequesting: true,
    });
  });

  test('handles REQUEST_ERROR', (): void => {
    const currentState = {
      error: null,
      isDisabled: false,
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
      isDisabled: false,
      isRequesting: false,
    });
  });

  test('handles REQUEST_SUCCESS', (): void => {
    const currentState = {
      error: null,
      isDisabled: false,
      isRequesting: false,
    };
    expect(reducer(currentState, { type: REQUEST_SUCCESS })).toEqual({
      error: null,
      isDisabled: true,
      isRequesting: false,
    });
  });
});
