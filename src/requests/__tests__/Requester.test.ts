import fetchMock from 'fetch-mock';

import { SignupAPI, APIResponse, TokenResponse } from '@authenticator/requests';
import config from '@authenticator/config';

jest.mock('store2', (): any => ({
  get: jest.fn().mockReturnValue('jwt-token')
}));

describe('Requestor Test', (): void => {
  afterEach((): void => {
    fetchMock.restore();
  });

  test('handles request error with no body', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/signup`;
    fetchMock.mock(url, {
      status: 500,
    });

    let response: APIResponse<TokenResponse>;
    try {
      response = await SignupAPI.register({
        password: 'swordfish',
        identity: 'jane@example.com',
        type: 'email',
      });
    } catch (e) {
      response = e;
    }
    expect(response.ok).toBe(false);
    expect(response.resultError).toEqual({
      message: 'Unable to complete request. Please try again later.',
      code: 'request_failure',
    });
  });

  test('handles API request error', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/signup`;
    fetchMock.mock(url, {
      status: 400,
      body: {
        error: {
          message: 'Password must be at least 8 characters.',
          code: 'min_password_length',
        },
      },
    });

    let response: APIResponse<TokenResponse>;
    try {
      response = await SignupAPI.register({
        password: 'swordfish',
        identity: 'jane@example.com',
        type: 'email',
      });
    } catch (e) {
      response = e;
    }
    expect(response.ok).toBe(false);
    expect(response.resultError).toEqual({
      message: 'Password must be at least 8 characters.',
      code: 'min_password_length',
    });
  });

  test('sets authorization header if token is found', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/signup/verify`;
    fetchMock.mock(url, {
      status: 200,
      body: {
        token: 'jwt-token',
        clientID: 'client-id',
      },
    });

    const response = await SignupAPI.verify({
      code: '012345',
    });
    expect(response.ok).toBe(true);
    expect(response.resultSuccess).toEqual({
      token: 'jwt-token',
      clientID: 'client-id',
    });
    const request = fetchMock.calls()[0][1];
    const headers = request ? request.headers : {};
    expect(headers).toEqual({
      'content-type': ['application/json'],
      'authorization': ['Bearer jwt-token'],
    });
  });
});
