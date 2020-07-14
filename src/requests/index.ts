import { APIResponse } from '@authenticator/requests/Requestor';
import LoginAPI, {
  VerifyCodeRequest,
  LoginRequest,
} from '@authenticator/requests/LoginAPI';
import SignupAPI, {
  SignupRequest,
  VerifyRequest,
} from '@authenticator/requests/SignupAPI';
import {
  InitDeviceResponse,
  VerifyDeviceResponse,
  CredentialResponse,
} from '@authenticator/requests/fido';
import DeviceAPI, {
} from '@authenticator/requests/DeviceAPI';
import TOTPAPI, {
  SecretResponse,
  TOTPRequest,
} from '@authenticator/requests/TOTPAPI';
import { TokenResponse } from '@authenticator/requests/token';
import ContactAPI, {
  DeliveryRequest,
  DeactivateRequest,
  SendRequest,
  VerifyContactRequest,
} from '@authenticator/requests/ContactAPI';

export {
  LoginAPI,
  VerifyDeviceResponse,
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
  VerifyRequest,
  APIResponse,
};

