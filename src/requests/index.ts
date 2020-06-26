import { APIResponse } from '@authenticator/requests/Requestor';
import SignupAPI, {
  SignupResponse,
  SignupRequest,
  VerifyRequest,
} from '@authenticator/requests/SignupAPI';
import DeviceAPI, {
  InitDeviceResponse,
  CredentialResponse,
} from '@authenticator/requests/DeviceAPI';
import TOTPAPI, {
  SecretResponse,
} from '@authenticator/requests/TOTPAPI';
import { TokenResponse } from '@authenticator/requests/token';
import ContactAPI, {
  DeliveryRequest,
  DeactivateRequest,
  SendRequest,
  VerifyContactRequest,
} from '@authenticator/requests/ContactAPI';

export {
  ContactAPI,
  DeliveryRequest,
  DeactivateRequest,
  SendRequest,
  VerifyContactRequest,
  TokenResponse,
  TOTPAPI,
  SecretResponse,
  DeviceAPI,
  InitDeviceResponse,
  CredentialResponse,
  SignupAPI,
  SignupRequest,
  SignupResponse,
  VerifyRequest,
  APIResponse,
};

