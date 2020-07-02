import { toBase64 } from '@authenticator/requests/fido';

describe('FIDO Utilities Test', (): void => {
  test('it parses BufferSource to base64', (): void => {
    const arrayBuffer = new ArrayBuffer(8);
    expect(toBase64(arrayBuffer)).toEqual('AAAAAAAAAAA');
  });
});
