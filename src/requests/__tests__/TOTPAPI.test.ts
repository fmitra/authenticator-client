import fetchMock from 'fetch-mock';

import { TOTPAPI } from '@authenticator/requests';
import config from '@authenticator/config';

describe('TOTPAPI Test', (): void => {
  afterEach((): void => {
    fetchMock.restore();
  });

  test('retrieves TOTP secret', async(): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/totp`;
    fetchMock.mock(url, {
      status: 200,
      body: {
        totp: 'otpauth://totp/Example:jane@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Example',
      },
    });

    const response = await TOTPAPI.secret();
    expect(response.ok).toBe(true);
    expect(response.resultSuccess).toEqual({
      totp: 'otpauth://totp/Example:jane@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Example',
    });
  });

  test('enables TOTP', async(): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/totp/configure`;
    fetchMock.mock(url, {
      status: 200,
      body: {
        token: 'jwt-token',
        clientID: 'client-id',
      },
    });

    const response = await TOTPAPI.enable({ code: '452411' });
    expect(response.ok).toBe(true);
    expect(response.resultSuccess).toEqual({
      token: 'jwt-token',
      clientID: 'client-id',
    });
  });

  test('disables TOTP', async(): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/totp/configure`;
    fetchMock.mock(url, {
      status: 200,
      body: {
        token: 'jwt-token',
        clientID: 'client-id',
      },
    });

    const response = await TOTPAPI.disable({ code: '452411' });
    expect(response.ok).toBe(true);
    expect(response.resultSuccess).toEqual({
      token: 'jwt-token',
      clientID: 'client-id',
    });
  });
});
