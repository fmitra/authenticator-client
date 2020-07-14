import { ThunkAction } from 'redux-thunk';

import { Action, State } from '@authenticator/loginVerify/reducer';
import Token from '@authenticator/identity/Token';
import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
} from '@authenticator/loginVerify/constants';
import {
  VerifyDeviceResponse,
  LoginAPI,
  TokenResponse,
  VerifyCodeRequest,
  APIResponse,
} from '@authenticator/requests';
import { PubKeyCredentialResponse } from '@authenticator/requests/fido';

export type Verification = ThunkAction<void, { loginVerify: State }, void, Action>;

export const verifyCode = (data: VerifyCodeRequest): Verification => async (dispatch): Promise<void> => {
  let response: APIResponse<TokenResponse>;

  dispatch({ type: REQUEST });

  try {
    response = await LoginAPI.verifyCode(data);
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


const retrieveCredentialCreationOptions = async (): Promise<VerifyDeviceResponse> => {
  let response: APIResponse<VerifyDeviceResponse>;

  try {
    response = await LoginAPI.challenge();
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

const createUserCredentials = async (credentialsAPI: CredentialsContainer, options: VerifyDeviceResponse): Promise<PubKeyCredentialResponse> => {
  let credential: Credential | null;

  try {
    credential = await credentialsAPI.get(options);
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

  return credential as PubKeyCredentialResponse;
};

export const verifyDevice = (credentialsAPI: CredentialsContainer): Verification => async (dispatch): Promise<void> => {
  let credentialCreationOptions: VerifyDeviceResponse;
  let credential: PubKeyCredentialResponse;
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
    response = await LoginAPI.verifyDevice(credential)
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
