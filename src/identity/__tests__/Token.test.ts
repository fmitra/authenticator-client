import Token from '@authenticator/identity/Token';
import { mockToken } from '@authenticator/identity/mock';

describe('Token Test', (): void => {
  test('sets a token to storage', (): void => {
    Token.set(mockToken);
    expect(Token.token).toBe(mockToken);
  });

  test('parses an expiration date', (): void => {
    Token.set(mockToken);
    expect(Token.expiresAt).toEqual(new Date('2019-06-01T04:49:41.000Z'));
  });

  test('retrieves token values', (): void => {
    const clientID = '3bdba3c548975a3456bdcdabe9b31db19d24243bf5d2418' +
      'bca8ec94fb04b47e5352ada8dd732c636a549b9d2b1c8af1ab710ab7b2ff3c' +
      'd3c657fa436e729e71b'

    Token.set(mockToken);
    expect(Token.jti).toBe('01DC8MST0YEHVEHJCJNAT76X1V');
    expect(Token.token).toBe(mockToken);
    expect(Token.issuer).toBe('authenticator');
    expect(Token.userID).toBe('01DC8MSSYPX8BR88JRRVZFVZTT');
    expect(Token.clientID).toBe(clientID);
    expect(Token.email).toBe('tofu@example.com');
    expect(Token.phoneNumber).toBe('');
    expect(Token.state).toBe('pre_authorized');
  });
});
