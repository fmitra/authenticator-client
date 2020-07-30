import { isMaybeEmail, isMaybePhone } from '@authenticator/identity/validators';

describe('validators Test', (): void => {
  test('checks for possible email', (): void => {
    const tableTest = [
      {
        email: 'jane@example.com',
        result: true,
      },
      {
        email: 'jane@examplecom',
        result: false,
      },
      {
        email: '+1555555555',
        result: false,
      },
      {
        email: '1234567789',
        result: false,
      },
    ];

    tableTest.forEach((tc): void => {
      expect(isMaybeEmail(tc.email)).toBe(tc.result);
    });
  });

  test('checks for possible phone', (): void => {
    const tableTest = [
      {
        phone: '+1555555555',
        result: true,
      },
      {
        phone: '1e10',
        result: false,
      },
      {
        phone: '1 (555) 555-5555',
        result: true,
      },
      {
        phone: '+1555ABC',
        result: false,
      },
    ];

    tableTest.forEach((tc): void => {
      expect(isMaybePhone(tc.phone)).toBe(tc.result);
    });
  });
});
