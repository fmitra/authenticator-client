import { h } from 'preact';
import { deep } from 'preact-render-spy';

import Verify from '@authenticator/contact/Verify';
import Token from '@authenticator/identity/Token'
import { mockToken } from '@authenticator/identity/mock';

describe('Contact Verify Test', (): void => {
  test('submits OTP code', (): void => {
    const verifyMock = jest.fn();
    const codeMock = {
      currentTarget: {
        value: '123456',
      },
    };
    const eventMock = {
      preventDefault: jest.fn(),
    };

    Token.set(mockToken);
    const component = deep(<Verify verify={verifyMock} />);

    component.find('#contact-verify-code').simulate('input', codeMock);
    component.find('#contact-verify-code').simulate('change', codeMock);
    component.find('button').simulate('click', eventMock);

    expect(verifyMock).toHaveBeenCalledWith({
      code: '123456',
      isDisabled: false,
    });
  });

  test('disables button for invalid code', (): void => {
    const verifyMock = jest.fn();
    const codeMock = {
      currentTarget: {
        value: '12345',
      },
    };

    Token.set(mockToken);
    const component = deep(<Verify verify={verifyMock} />);

    component.find('#contact-verify-code').simulate('input', codeMock);
    component.find('#contact-verify-code').simulate('change', codeMock);

    const attrs: any = component.find('button').attrs();
    expect(attrs.disabled).toBe(true);

    expect(component.state().errors.errors).toEqual({
      code: {
        code: 'invalid_code',
        message: 'Code should be at least 6 characters long',
      }
    });
  });
});
