import { ThunkAction } from 'redux-thunk';
import { push } from 'preact-router-redux';

import routes from '@authenticator/app/routes';
import { Action, State } from '@authenticator/login/reducer';
import Token from '@authenticator/identity/Token';
import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
} from '@authenticator/login/constants';
import {
  LoginAPI,
  TokenResponse,
  LoginRequest,
  APIResponse,
} from '@authenticator/requests';

export type InitLogin = ThunkAction<void, { login: State }, void, Action>;

/**
 * Completes the initial login step to identify
 * a user with our services. Valid users are prompted
 * to coomplete 2FA after successfully being identified.
 */
export const login = (data: LoginRequest): InitLogin => async (dispatch): Promise<void> => {
  let response: APIResponse<TokenResponse>;

  dispatch({ type: REQUEST });

  try {
    response = await LoginAPI.login(data);
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
  dispatch(push(routes.LOGIN_VERIFY));
};
