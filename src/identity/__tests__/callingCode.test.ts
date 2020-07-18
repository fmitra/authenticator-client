import callingCode from '@authenticator/identity/callingCode';

describe('callingCode Test', (): void => {
  test('returns country code by region', (): void => {
    const tableTest = [
      {
        name: 'Language/Region Combo',
        input: 'en-US',
        result: '+1',
      },
      {
        name: 'Case insensitive',
        input: 'ru-RU',
        result: '+7',
      },
      {
        name: 'Missing Region',
        input: 'fr',
        result: '+33',
      },
      {
        name: 'Invalid input',
        input: '',
        result: '',
      },
    ];

    tableTest.forEach((tc): void => {
      expect(callingCode(tc.input)).toEqualWithMessage(tc.result, tc.name);
    });
  });
});
