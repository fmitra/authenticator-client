import { h } from 'preact';
import { deep } from 'preact-render-spy';

import TOTP from '@authenticator/totp/TOTP';

jest.mock('@authenticator/totp/components/QR');

describe('TOTP Test', (): void => {
  test('requests TOTP secret', (): void => {
    const secretMock = jest.fn();
    const eventMock = {
      preventDefault: jest.fn(),
    };
    const component = deep(<TOTP secret={secretMock} />);

    component.find('button').simulate('click', eventMock);
    expect(secretMock).toHaveBeenCalledWith();
  });

  test('submits TOTP code', (): void => {
    const enableMock = jest.fn();
    const eventMock = {
      preventDefault: jest.fn(),
    };
    const codeMock = {
      currentTarget: {
        value: '123456',
      },
    };
    const component = deep(<TOTP totp='totp://secret' enable={enableMock} />);

    component.find('#totp-code').simulate('input', codeMock);
    component.find('#totp-code').simulate('change', codeMock);

    component.find('button').simulate('click', eventMock);
    expect(enableMock).toHaveBeenCalledWith({
      code: '123456',
    });
  });

  test('disables submit on invalid TOTP code', (): void => {
    const enableMock = jest.fn();
    const codeMock = {
      currentTarget: {
        value: '12345',
      },
    };
    const component = deep(<TOTP totp='totp://secret' enable={enableMock} />);

    component.find('#totp-code').simulate('input', codeMock);
    component.find('#totp-code').simulate('change', codeMock);

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
