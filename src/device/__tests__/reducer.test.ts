import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
} from '@authenticator/device/constants';
import reducer, { defaultState } from '@authenticator/device/reducer';

describe('device Reducer Test', (): void => {
  test('handles REQUEST', (): void => {
    const currentState = {...defaultState};
    expect(reducer(currentState, { type: REQUEST })).toEqual({
      error: null,
      isRequesting: true,
      isEnabled: false,
    });
  });

  test('handles REQUEST_ERROR', (): void => {
    const currentState = {...defaultState};
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
    });
  });

  test('handles REQUEST_SUCCESS', (): void => {
    const currentState = {...defaultState};
    expect(reducer(currentState, { type: REQUEST_SUCCESS })).toEqual({
      error: null,
      isRequesting: false,
      isEnabled: true,
    });
  });
});
