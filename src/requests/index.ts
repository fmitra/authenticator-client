import { APIResponse } from '@authenticator/requests/Requestor';
import LoginAPI, {
  LoginRequest,
} from '@authenticator/requests/LoginAPI';
import SignupAPI, {
  SignupRequest,
} from '@authenticator/requests/SignupAPI';
import {
  InitDeviceResponse,
  VerifyDeviceResponse,
  CredentialResponse,
  PubKeyCredentialResponse,
} from '@authenticator/requests/fido';
import DeviceAPI, {
} from '@authenticator/requests/DeviceAPI';
import TOTPAPI, {
  SecretResponse,
  TOTPRequest,
} from '@authenticator/requests/TOTPAPI';
import {
  VerifyCodeRequest,
  TokenResponse,
} from '@authenticator/requests/token';
import ContactAPI, {
  DeliveryRequest,
  DeactivateRequest,
  SendRequest,
  VerifyContactRequest,
} from '@authenticator/requests/ContactAPI';

export {
  LoginAPI,
  VerifyDeviceResponse,
  PubKeyCredentialResponse,
  VerifyCodeRequest,
  LoginRequest,
  ContactAPI,
  DeliveryRequest,
  DeactivateRequest,
  SendRequest,
  VerifyContactRequest,
  TokenResponse,
  TOTPRequest,
  TOTPAPI,
  SecretResponse,
  DeviceAPI,
  InitDeviceResponse,
  CredentialResponse,
  SignupAPI,
  SignupRequest,
  APIResponse,
};
