import { ThunkAction } from 'redux-thunk';
import { push } from 'preact-router-redux';

import routes from '@authenticator/app/routes';
import { Action, State } from '@authenticator/contact/reducer';
import Token from '@authenticator/identity/Token';
import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
} from '@authenticator/contact/constants';
import {
  ContactAPI,
  DeliveryRequest,
  TokenResponse,
  APIResponse,
} from '@authenticator/requests';

export type AddressCheck = ThunkAction<void, { contact: State }, void, Action>;

/**
 * Completes verification of a recently registered user.
 */
export const checkAddress = (data: DeliveryRequest): AddressCheck => async (dispatch): Promise<void> => {
  let response: APIResponse<TokenResponse>;

  dispatch({ type: REQUEST });

  try {
    response = await ContactAPI.checkAddress(data);
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
  dispatch(push(routes.CONTACT_VERIFY));
};
