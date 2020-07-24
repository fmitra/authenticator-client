export interface TokenResponse {
  token: string;
  clientID?: string;
  refreshToken?: string;
}

export interface VerifyCodeRequest {
  code: string;
}
