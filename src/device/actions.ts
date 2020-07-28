import { ThunkAction } from 'redux-thunk';

import { Action, State } from '@authenticator/device/reducer';
import Token from '@authenticator/identity/Token';
import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
} from '@authenticator/device/constants';
import {
  DeviceAPI,
  InitDeviceResponse,
  CredentialResponse,
  APIResponse,
  TokenResponse,
} from '@authenticator/requests';

export type PublicKeyCreation = ThunkAction<void, { device: State }, void, Action>;

const retrieveCredentialCreationOptions = async (): Promise<InitDeviceResponse> => {
  let response: APIResponse<InitDeviceResponse>;

  try {
    response = await DeviceAPI.initiate();
  } catch(e) {
    throw e.resultError;
  }

  if (!response.resultSuccess) {
    throw {
      code: 'empty_response',
      message: 'No response received',
    };
  }

  return response.resultSuccess;
};

const createUserCredentials = async (credentialsAPI: CredentialsContainer, options: InitDeviceResponse): Promise<CredentialResponse> => {
  let credential: Credential | null;

  try {
    credential = await credentialsAPI.create(options)
  } catch(e) {
    throw {
      code: 'credentials_dom_error',
      message: e.message || (
        'We couldn\'t register your device. Please check that your device is in use'
      ),
    }
  }

  if (!credential) {
    throw {
      code: 'credentials_dom_error',
      message: 'We couldn\'t register your device. Please try again later',
    };
  }

  return credential as CredentialResponse;
};

/**
 * Requests device registration through the browsers credentials API.
 */
export const registerDevice = (credentialsAPI: CredentialsContainer): PublicKeyCreation => async (dispatch): Promise<void> => {
  let credentialCreationOptions: InitDeviceResponse;
  let credential: CredentialResponse;
  let response: APIResponse<TokenResponse>;

  dispatch({ type: REQUEST });

  try {
    credentialCreationOptions = await retrieveCredentialCreationOptions()
  } catch(e) {
    dispatch({ type: REQUEST_ERROR, error: e });
    return;
  }

  try {
    credential = await createUserCredentials(credentialsAPI, credentialCreationOptions)
  } catch(e) {
    dispatch({ type: REQUEST_ERROR, error: e });
    return;
  }

  try {
    response = await DeviceAPI.verify(credential)
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
