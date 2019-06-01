import { classes } from '@authenticator/ui';

describe('classes Test', (): void => {
  test('generates a class string for enabled class names', (): void => {
    const className = classes({
      'btn': true,
      'btn--blue': false,
      'btn--lrg': true,
    });
    expect(className).toBe('btn btn--lrg');
  });
});
