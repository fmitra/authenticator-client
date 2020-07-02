import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS
} from '@authenticator/contact/constants';
import reducer from '@authenticator/contact/reducer';

describe('contact Reducer Test', (): void => {
  test('handles REQUEST', (): void => {
    const currentState = {
      error: null,
      isRequesting: false,
    };
    expect(reducer(currentState, { type: REQUEST })).toEqual({
      error: null,
      isRequesting: true,
    });
  });

  test('handles REQUEST_ERROR', (): void => {
    const currentState = {
      error: null,
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
    });
  });

  test('handles REQUEST_SUCCESS', (): void => {
    const currentState = {
      error: null,
      isRequesting: false,
    };
    expect(reducer(currentState, { type: REQUEST_SUCCESS })).toEqual({
      error: null,
      isRequesting: false,
    });
  });
});
