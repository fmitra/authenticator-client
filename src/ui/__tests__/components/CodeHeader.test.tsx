import { h } from 'preact';
import { deep } from 'preact-render-spy';

import { CodeHeader } from '@authenticator/ui/components';

describe('CodeHeader Test', (): void => {
  test('it renders OTP header', (): void => {
    const backBtnMock = jest.fn();
    const component = deep(<CodeHeader
      goBack={backBtnMock}
      lastMessageAddress='jane@example.com'
    />);
    expect(component.find('.subtitle').text())
      .toBe('Please enter the 6 digit code sent to');

    component.find('.code-header__back').simulate('click');
    expect(backBtnMock).toHaveBeenCalled();
  });

  test('it renders TOTP header', (): void => {
    const component = deep(<CodeHeader
      goBack={jest.fn()}
      lastMessageAddress=''
    />);
    expect(component.find('.subtitle').text())
      .toBe('Generate a new 6 digit verification code.');
  });
});
