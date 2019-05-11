import Requestor from '@authenticator/requests/Requestor';

interface VerifyRequest {
  code: string;
}

interface SignUpRequest {
  password: string;
  identity: string;
  type: string;
}

interface SignUpResponse {
  token: string;
  clientID: string;
}

class SignUp extends Requestor {
  register(data: SignUpRequest): Promise<SignUpResponse> {
    const url = this.endpoint('signup');
    return this.post<SignUpResponse>(url, data);
  }

  verify(data: VerifyRequest): Promise<SignUpResponse> {
    const url = this.endpoint('signup/verify');
    return this.post<SignUpResponse>(url, data);
  }
}

export default new SignUp();
