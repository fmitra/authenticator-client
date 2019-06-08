import fetchMock from 'fetch-mock';

import { SignupAPI } from '@authenticator/requests';
import config from '@authenticator/config';

describe('SignupAPI Test', (): void => {
  afterEach((): void => {
    fetchMock.restore();
  });

  test('registers a new user', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/signup`;
    fetchMock.mock(url, {
      status: 201,
      body: {
        token: 'jwt-token',
        clientID: 'client-id',
      },
    });

    const response = await SignupAPI.register({
      password: 'swordfish',
      identity: 'jane@example.com',
      type: 'email',
    });
    expect(response.ok).toBe(true);
    expect(response.resultSuccess).toEqual({
      token: 'jwt-token',
      clientID: 'client-id',
    });
  });

  test('verifies a new user', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/signup/verify`;
    fetchMock.mock(url, {
      status: 201,
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
  });
});
