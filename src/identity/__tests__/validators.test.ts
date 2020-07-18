import { isMaybeEmail, isMaybePhone } from '@authenticator/identity/validators';

describe('validators Test', (): void => {
  test('checks for possible email', (): void => {
    const tableTest = [
      {
        name: 'Valid email: jane@example.com',
        email: 'jane@example.com',
        result: true,
      },
      {
        name: 'Invalid email: jane@examplecom',
        email: 'jane@examplecom',
        result: false,
      },
      {
        name: 'Invalid email: +1555555555',
        email: '+1555555555',
        result: false,
      },
      {
        name: 'Invalid email: 1234567789',
        email: '1234567789',
        result: false,
      },
    ];

    tableTest.forEach((tc): void => {
      expect(isMaybeEmail(tc.email)).toEqualWithMessage(tc.result, tc.name);
    });
  });

  test('checks for possible phone', (): void => {
    const tableTest = [
      {
        name: 'Valid phone: +1555555555',
        phone: '+1555555555',
        result: true,
      },
      {
        name: 'Invalid phone: 1e10',
        phone: '1e10',
        result: false,
      },
      {
        name: 'Valid phone: 1 (555) 555-5555',
        phone: '1 (555) 555-5555',
        result: true,
      },
      {
        name: 'Invalid phone: +1555ABC',
        phone: '+1555ABC',
        result: false,
      },
    ];

    tableTest.forEach((tc): void => {
      expect(isMaybePhone(tc.phone)).toEqualWithMessage(tc.result, tc.name);
    });
  });
});
