import {
  REQUEST,
  REQUEST_ERROR,
  VERIFY_CONTACT,
  SUBMIT_CONTACT,
  VERIFIED,
} from '@authenticator/contact/constants';
import reducer, { defaultState } from '@authenticator/contact/reducer';

describe('contact Reducer Test', (): void => {
  test('handles REQUEST', (): void => {
    const currentState = { ...defaultState }
    const result = { ...defaultState };
    result.isRequesting = true;
    expect(reducer(currentState, { type: REQUEST })).toEqual(result);
  });

  test('handles REQUEST_ERROR', (): void => {
    const currentState = { ...defaultState }
    const result = { ...defaultState };
    const error = {
      message: 'Whoops something bad happened',
      code: 'error_code',
    }
    result.error = error;
    expect(reducer(currentState, { type: REQUEST_ERROR, error: error }))
      .toEqual(result);
  });

  test('handles VERIFY_CONTACT', (): void => {
    const currentState = { ...defaultState };
    currentState.isRequesting = true;

    const result = { ...defaultState };
    result.isRequesting = false;
    result.needAccountDetails = false;
    result.needVerification = true;

    expect(reducer(currentState, { type: VERIFY_CONTACT})).toEqual(result);
  });

  test('handles SUBMIT_CONTACT', (): void => {
    const currentState = { ...defaultState };
    currentState.isRequesting = true;

    const result = { ...defaultState };
    result.isRequesting = false;

    expect(reducer(currentState, { type: SUBMIT_CONTACT })).toEqual(result);
  });

  test('handles VERIFIED', (): void => {
    const currentState = { ...defaultState };
    currentState.needVerification = true;

    const result = { ...defaultState };
    result.needAccountDetails = false;
    result.needVerification = false;
    expect(reducer(currentState, { type: VERIFIED })).toEqual(result);
  });
});
