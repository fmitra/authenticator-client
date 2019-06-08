import { ThunkAction } from 'redux-thunk';

import { Action, State } from '@authenticator/signupVerify/reducer';
import Token from '@authenticator/identity/Token';
import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
} from '@authenticator/signupVerify/constants';
import {
  SignupAPI,
  SignupResponse,
  VerifyRequest,
  APIResponse,
} from '@authenticator/requests';

export type Verification = ThunkAction<void, { signup: State }, void, Action>;

/**
 * Completes verification of a recently registered user.
 */
export const verify = (data: VerifyRequest): Verification => async (dispatch): Promise<void> => {
  let response: APIResponse<SignupResponse>;

  dispatch({ type: REQUEST });

  try {
    response = await SignupAPI.verify(data);
  } catch(e) {
    dispatch({ type: REQUEST_ERROR, error: e.resultError });
    return;
  }

  if (!response.resultSuccess) {
    dispatch({ type: REQUEST_ERROR, error: {
      code: 'empty_response',
      message: 'No response received',
    } });
    return;
  }

  try {
    Token.set(response.resultSuccess.token);
  } catch(e) {
    dispatch({ type: REQUEST_ERROR, error: {
      code: 'invalid_token',
      message: 'Token is not correctly formatted',
    } });
    return;
  }

  dispatch({ type: REQUEST_SUCCESS });
};
