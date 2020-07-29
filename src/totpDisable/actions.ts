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

export const disable = (data: TOTPRequest): TOTPThunk => async (dispatch): Promise<void> => {
  let response: APIResponse<TokenResponse>;

  dispatch({ type: REQUEST });

  try {
    response = await TOTPAPI.disable(data);
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
