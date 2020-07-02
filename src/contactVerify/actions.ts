import { ThunkAction } from 'redux-thunk';

import { Action, State } from '@authenticator/contactVerify/reducer';
import Token from '@authenticator/identity/Token';
import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
} from '@authenticator/contactVerify/constants';
import {
  ContactAPI,
  VerifyContactRequest,
  TokenResponse,
  APIResponse,
} from '@authenticator/requests';

export type Verification = ThunkAction<void, { contactVerify: State }, void, Action>;

/**
 * Completes verification of a recently registered user.
 */
export const verify = (data: VerifyContactRequest): Verification => async (dispatch): Promise<void> => {
  let response: APIResponse<TokenResponse>;

  dispatch({ type: REQUEST });

  try {
    response = await ContactAPI.verify(data);
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
