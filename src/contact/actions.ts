import { ThunkAction } from 'redux-thunk';

import { Action, State } from '@authenticator/contact/reducer';
import Token from '@authenticator/identity/Token';
import {
  REQUEST,
  REQUEST_ERROR,
  VERIFY_CONTACT,
  SUBMIT_CONTACT,
  VERIFIED,
} from '@authenticator/contact/constants';
import {
  ContactAPI,
  DeliveryRequest,
  VerifyContactRequest,
  TokenResponse,
  APIResponse,
} from '@authenticator/requests';

export type ContactThunk = ThunkAction<void, { contact: State }, void, Action>;

/**
 * Completes verification of a recently registered user.
 */
export const checkAddress = (data: DeliveryRequest): ContactThunk => async (dispatch): Promise<void> => {
  let response: APIResponse<TokenResponse>;

  dispatch({ type: REQUEST });

  try {
    response = await ContactAPI.checkAddress(data);
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

  dispatch({ type: VERIFY_CONTACT });
};

/**
 * Completes verification of a recently registered user.
 */
export const verify = (data: VerifyContactRequest): ContactThunk => async (dispatch): Promise<void> => {
  let response: APIResponse<TokenResponse>;

  dispatch({ type: REQUEST });

  try {
    response = await ContactAPI.verify(data);
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

  dispatch({ type: VERIFIED });
};

export const restartFlow = (): ContactThunk => async (dispatch): Promise<void> => {
  dispatch({ type: SUBMIT_CONTACT });
}
