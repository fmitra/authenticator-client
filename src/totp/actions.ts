import { ThunkAction } from 'redux-thunk';

import { Action, State } from '@authenticator/totp/reducer';
import Token from '@authenticator/identity/Token';
import {
  REQUEST,
  REQUEST_ERROR,
  SECRET_CREATED,
  TOTP_IS_ENABLED,
} from '@authenticator/totp/constants';
import {
  TOTPAPI,
  SecretResponse,
  TokenResponse,
  APIResponse,
  TOTPRequest,
} from '@authenticator/requests';

export type TOTPThunk = ThunkAction<void, { totp: State }, void, Action>;

export const secret = (): TOTPThunk => async (dispatch): Promise<void> => {
  let response: APIResponse<SecretResponse>;

  dispatch({ type: REQUEST });

  try {
    response = await TOTPAPI.secret();
  } catch(e) {
    dispatch({ type: REQUEST_ERROR, error: e.resultError });
    return;
  }

  dispatch({ type: SECRET_CREATED, totp: response.resultSuccess.totp });
};

export const enable = (data: TOTPRequest): TOTPThunk => async (dispatch): Promise<void> => {
  let response: APIResponse<TokenResponse>;

  dispatch({ type: REQUEST });

  try {
    response = await TOTPAPI.enable(data);
  } catch(e) {
    dispatch({ type: REQUEST_ERROR, error: e.resultError });
    return;
  }

  try {
    Token.set(response.resultSuccess.token);
  } catch(e) {
    dispatch({ type: REQUEST_ERROR, error: e });
    return;
  }

  dispatch({ type: TOTP_IS_ENABLED });
};
