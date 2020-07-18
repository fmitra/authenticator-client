import { EMAIL, PHONE, phoneWithRegion, inferContactMethod } from '@authenticator/identity/contact';

describe('inferContactMethod Test', (): void => {
  test('it infers a phone number', (): void => {
    const tableTest = [
      {
        name: 'Phone: +15555555555',
        phone: '+15555555555',
        result: PHONE,
      },
      {
        name: 'Phone: (555) 555-5555',
        phone: '(555) 555-5555',
        result: PHONE,
      },
      {
        name: 'Phone: 5555555555',
        phone: '5555555555',
        result: PHONE,
      },
      {
        name: 'Phone: 5555555555',
        phone: '5555555555',
        result: PHONE,
      },
      {
        name: 'Phone: 555-555-5555',
        phone: '555-555-5555',
        result: PHONE,
      },
      {
        name: 'Phone: 09 555 5555',
        phone: '09 555 5555',
        result: PHONE,
      },
      {
        name: 'Phone: 09',
        phone: '09',
        result: PHONE,
      },
    ];

    tableTest.forEach((tc): void => {
      expect(inferContactMethod(tc.phone)).toEqualWithMessage(tc.result, tc.name);
    });
  });

  test('it infers an email address', (): void => {
    const tableTest = [
      {
        name: 'Email: jane@example.com',
        email: 'jane@example.com',
        result: EMAIL,
      },
      {
        name: 'Email: jane@example',
        email: 'jane@example',
        result: EMAIL,
      },
      {
        name: 'Email: text-only',
        email: 'text-only',
        result: EMAIL,
      },
      {
        name: 'Email: 1e10',
        email: '1e10',
        result: EMAIL,
      },
      {
        name: 'Email: gmail.com',
        email: 'gmail.com',
        result: EMAIL,
      },
      {
        name: 'Email: 123@test.com',
        email: '123@test.com',
        result: EMAIL,
      },
      {
        name: 'Email: 123@',
        email: '123@',
        result: EMAIL,
      },
    ];

    tableTest.forEach((tc): void => {
      expect(inferContactMethod(tc.email)).toEqualWithMessage(tc.result, tc.name);
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
