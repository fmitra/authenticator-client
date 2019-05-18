import { ThunkAction } from 'redux-thunk';

import { Action, State } from '@authenticator/signup/reducer';
import { Token } from '@authenticator/identity';
import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
} from '@authenticator/signup/constants';
import {
  SignupAPI,
  SignupResponse,
  SignupRequest,
  APIResponse,
} from '@authenticator/requests';

export type Registration = ThunkAction<void, { signup: State }, void, Action>;

/**
 * Completes the initial registration step to identify
 * a user with our services. User's who start registration
 * must still complete an additional verification step to
 * confirm their identity (eg confirm a code sent to a phone
 * number or email address.
 *
 * On success, we persist the retrieved token in memory
 * and localStorage, otherwise we dispatch an error notice
 * to the UI.
 */
export const register = (data: SignupRequest): Registration => async (dispatch): Promise<void> => {
  let response: APIResponse<SignupResponse>;

  dispatch({ type: REQUEST });

  try {
    response = await SignupAPI.register(data);
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
  }

  dispatch({ type: REQUEST_SUCCESS });
};
