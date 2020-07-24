import { ThunkAction } from 'redux-thunk';

import { Action, State } from '@authenticator/login/reducer';
import Token from '@authenticator/identity/Token';
import {
  REQUEST,
  REQUEST_ERROR,
  VERIFY_ACCOUNT,
  VERIFIED,
} from '@authenticator/login/constants';
import {
  LoginAPI,
  TokenResponse,
  VerifyDeviceResponse,
  VerifyCodeRequest,
  LoginRequest,
  APIResponse,
  PubKeyCredentialResponse,
} from '@authenticator/requests';

export type LoginThunk = ThunkAction<void, { login: State }, void, Action>;

/**
 * Completes the initial login step to identify
 * a user with our services. Valid users are prompted
 * to coomplete 2FA after successfully being identified.
 */
export const login = (data: LoginRequest): LoginThunk => async (dispatch): Promise<void> => {
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

  dispatch({ type: VERIFY_ACCOUNT });
};

export const verifyCode = (data: VerifyCodeRequest): LoginThunk => async (dispatch): Promise<void> => {
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

  dispatch({ type: VERIFIED });
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

export const verifyDevice = (credentialsAPI: CredentialsContainer): LoginThunk => async (dispatch): Promise<void> => {
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

  dispatch({ type: VERIFIED });
};
