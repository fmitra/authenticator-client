import { ThunkAction } from 'redux-thunk';

import { Action, State } from '@authenticator/login/reducer';
import Token from '@authenticator/identity/Token';
import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  VERIFY_ACCOUNT,
  SUBMIT_IDENTITY,
  VERIFIED,
} from '@authenticator/login/constants';
import {
  ContactAPI,
  LoginAPI,
  TokenResponse,
  VerifyDeviceResponse,
  VerifyCodeRequest,
  SendRequest,
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

  try {
    Token.set(response.resultSuccess.token);
  } catch(e) {
    dispatch({ type: REQUEST_ERROR, error: e });
    return;
  }

  dispatch({ type: VERIFY_ACCOUNT });
};

/**
 * Verifies a code to complete 2FA and retrieve a verified
 * JWT token.
 */
export const verifyCode = (data: VerifyCodeRequest): LoginThunk => async (dispatch): Promise<void> => {
  let response: APIResponse<TokenResponse>;

  dispatch({ type: REQUEST });

  try {
    response = await LoginAPI.verifyCode(data);
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


/**
 * Retrieves a signing challenge to be signed against a User's
 * FIDO compliant device.
 */
const retrieveCredentialCreationOptions = async (): Promise<VerifyDeviceResponse> => {
  let response: APIResponse<VerifyDeviceResponse>;

  try {
    response = await LoginAPI.challenge();
  } catch(e) {
    throw e.resultError;
  }

  return response.resultSuccess;
};

/**
 * Retrieves a credentials object using the browser's Webauthn API
 * to be used for signing functions.
 */
const createUserCredentials = async (credentialsAPI: CredentialsContainer, options: VerifyDeviceResponse): Promise<PubKeyCredentialResponse> => {
  let credential: Credential | null;

  try {
    credential = await credentialsAPI.get(options);
  } catch(e) {
    throw {
      code: 'credentials_dom_error',
      message: e.message || (
        'We couldn\'t retrieve your credentials. Please check that your device is in use'
      ),
    }
  }

  if (!credential) {
    throw {
      code: 'credentials_dom_error',
      message: 'We couldn\'t retrieve your credentials. Please try again later',
    };
  }

  return credential as PubKeyCredentialResponse;
};

/**
 * Signs a server generated challenge with a User's FIDO compliant
 * device to complete 2FA and retrieve a verified JWT token.
 */
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

  try {
    Token.set(response.resultSuccess.token);
  } catch(e) {
    dispatch({ type: REQUEST_ERROR, error: e });
    return;
  }

  dispatch({ type: VERIFIED });
};

/**
 * Return back to the first step of the login flow (retrieve username/credentials)
 */
export const restartFlow = (): LoginThunk => async (dispatch): Promise<void> => {
  dispatch({ type: SUBMIT_IDENTITY });
}

/**
 * Requests an OTP code to be re-deliveed to a user via email or SMS.
 */
export const resendCode = (data: SendRequest): LoginThunk => async (dispatch): Promise<void> => {
  let response: APIResponse<TokenResponse>;

  dispatch({ type: REQUEST });

  try {
    response = await ContactAPI.send(data);
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
