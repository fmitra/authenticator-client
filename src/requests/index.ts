import { APIResponse } from '@authenticator/requests/Requestor';
import SignupAPI, {
  SignupRequest,
  VerifyRequest,
} from '@authenticator/requests/SignupAPI';
import DeviceAPI, {
  InitDeviceResponse,
  CredentialResponse,
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

