import { APIResponse } from '@authenticator/requests/Requestor';
import SignupAPI, {
  SignupResponse,
  SignupRequest,
  VerifyRequest,
} from '@authenticator/requests/SignupAPI';
import DeviceAPI, {
  InitDeviceResponse,
  CredentialResponse,
}from '@authenticator/requests/DeviceAPI';

export {
  DeviceAPI,
  InitDeviceResponse,
  CredentialResponse,
  SignupAPI,
  SignupRequest,
  SignupResponse,
  VerifyRequest,
  APIResponse,
};

