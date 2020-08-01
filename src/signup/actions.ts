import { ThunkAction } from 'redux-thunk';

import { Action, State } from '@authenticator/signup/reducer';
import Token from '@authenticator/identity/Token';
import {
  REQUEST,
  REQUEST_ERROR,
  VERIFY_ACCOUNT,
  CREATE_ACCOUNT,
  VERIFIED,
} from '@authenticator/signup/constants';
import {
  SignupAPI,
  TokenResponse,
  SignupRequest,
  VerifyCodeRequest,
  APIResponse,
} from '@authenticator/requests';

export type SignupThunk = ThunkAction<void, { signup: State }, void, Action>;

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
export const register = (data: SignupRequest): SignupThunk => async (dispatch): Promise<void> => {
  let response: APIResponse<TokenResponse>;

  dispatch({ type: REQUEST });

  try {
    response = await SignupAPI.register(data);
  } catch(e) {
    dispatch({ type: REQUEST_ERROR, error: e.resultError });
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

  dispatch({ type: VERIFY_ACCOUNT });
};

/**
 * Completes verification of a recently registered user.
 */
export const verify = (data: VerifyCodeRequest): SignupThunk => async (dispatch): Promise<void> => {
  let response: APIResponse<TokenResponse>;

  dispatch({ type: REQUEST });

  try {
    response = await SignupAPI.verify(data);
  } catch(e) {
    dispatch({ type: REQUEST_ERROR, error: e.resultError });
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

  dispatch({ type: VERIFIED });
};

export const restartFlow = (): SignupThunk => async (dispatch): Promise<void> => {
  dispatch({ type: CREATE_ACCOUNT });
}
