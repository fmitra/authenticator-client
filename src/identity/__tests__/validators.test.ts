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

    tableTest.forEach(testCase => {
      expect(isMaybeEmail(testCase.email)).toBe(testCase.result);
    });
  });

  test('checks for possible phone', (): void => {
    const tableTest = [
      {
        phone: '+1555555555',
        result: true,
      },
      {
        phone: '1555555555',
        result: false,
      },
      {
        phone: '+1555ABC',
        result: false,
      },
    ];

    tableTest.forEach(testCase => {
      expect(isMaybePhone(testCase.phone)).toBe(testCase.result);
    });
  });
});
