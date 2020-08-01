import { h } from 'preact';
import { deep } from 'preact-render-spy';

import TOTPDisable from '@authenticator/totpDisable/TOTPDisable';

describe('TOTPDisable Test', (): void => {
  test('sends code to disable TOTP', (): void => {
    const disableMock = jest.fn();
    const codeMock = {
      currentTarget: {
        value: '123456',
      },
    }
    const eventMock = {
      preventDefault: jest.fn(),
    };
    const component = deep(<TOTPDisable disable={disableMock} />);

    component.find('#totp-disable-code').simulate('input', codeMock);
    component.find('#totp-disable-code').simulate('change', codeMock);

    component.find('button').simulate('click', eventMock);
    expect(disableMock).toHaveBeenCalledWith({
      code: '123456',
    });
  });

  test('disables submit button on invalid TOTP code', (): void => {
    const disableMock = jest.fn();
    const codeMock = {
      currentTarget: {
        value: '12345',
      },
    }
    const component = deep(<TOTPDisable disable={disableMock} />);

    component.find('#totp-disable-code').simulate('input', codeMock);
    component.find('#totp-disable-code').simulate('change', codeMock);

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
