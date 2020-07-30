import { EMAIL, PHONE, phoneWithRegion, inferContactMethod } from '@authenticator/identity/contact';

describe('inferContactMethod Test', (): void => {
  test('it infers a phone number', (): void => {
    const tableTest = [
      {
        phone: '+15555555555',
        result: PHONE,
      },
      {
        phone: '(555) 555-5555',
        result: PHONE,
      },
      {
        phone: '5555555555',
        result: PHONE,
      },
      {
        phone: '5555555555',
        result: PHONE,
      },
      {
        phone: '555-555-5555',
        result: PHONE,
      },
      {
        phone: '09 555 5555',
        result: PHONE,
      },
      {
        phone: '09',
        result: PHONE,
      },
    ];

    tableTest.forEach((tc): void => {
      expect(inferContactMethod(tc.phone)).toBe(tc.result);
    });
  });

  test('it infers an email address', (): void => {
    const tableTest = [
      {
        email: 'jane@example.com',
        result: EMAIL,
      },
      {
        email: 'jane@example',
        result: EMAIL,
      },
      {
        email: 'text-only',
        result: EMAIL,
      },
      {
        email: '1e10',
        result: EMAIL,
      },
      {
        email: 'gmail.com',
        result: EMAIL,
      },
      {
        email: '123@test.com',
        result: EMAIL,
      },
      {
        email: '123@',
        result: EMAIL,
      },
    ];

    tableTest.forEach((tc): void => {
      expect(inferContactMethod(tc.email)).toBe(tc.result);
    });
  });
});

describe('phoneWithRegion Test', (): void => {
  test('it prefixes phone nubmer with country code', (): void => {
    expect(phoneWithRegion('555-555-5555', 'en-US')).toEqual('+15555555555')
  });

  test('it skips prefixed phone number', (): void => {
    expect(phoneWithRegion('+1555-555-5555', 'en-US')).toEqual('+15555555555')
  });
});
