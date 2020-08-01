import { ThunkAction } from 'redux-thunk';

import { Action, State } from '@authenticator/totpDisable/reducer';
import Token from '@authenticator/identity/Token';
import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
} from '@authenticator/totpDisable/constants';
import {
  TOTPAPI,
  TokenResponse,
  APIResponse,
  TOTPRequest,
} from '@authenticator/requests';

export type TOTPThunk = ThunkAction<void, { totp: State }, void, Action>;

/**
 * Submits a TOTP code to disable TOTP as a 2FA option
 * for a user.
 */
export const disable = (data: TOTPRequest): TOTPThunk => async (dispatch): Promise<void> => {
  let response: APIResponse<TokenResponse>;

  dispatch({ type: REQUEST });

  try {
    response = await TOTPAPI.disable(data);
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

  dispatch({ type: REQUEST_SUCCESS });
};
