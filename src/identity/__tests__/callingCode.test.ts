import callingCode from '@authenticator/identity/callingCode';

describe('callingCode Test', (): void => {
  test('returns country code by region', (): void => {
    const tableTest = [
      {
        input: 'en-US',
        result: '+1',
      },
      {
        input: 'ru-RU',
        result: '+7',
      },
      {
        input: 'fr',
        result: '+33',
      },
      {
        input: '',
        result: '',
      },
    ];

    tableTest.forEach((tc): void => {
      expect(callingCode(tc.input)).toBe(tc.result);
    });
  });
});
