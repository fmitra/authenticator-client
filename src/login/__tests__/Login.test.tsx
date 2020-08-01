import { h } from 'preact';
import { deep } from 'preact-render-spy';

import Login from '@authenticator/login/Login';

describe('Login Test', (): void => {
  test('submits username and password', (): void => {
    const loginMock = jest.fn();
    const usernameMock = {
      currentTarget: {
        value: 'jane@example.com',
      },
    };
    const passwordMock = {
      currentTarget: {
        value: 'swordfish',
      },
    };
    const eventMock = {
      preventDefault: jest.fn(),
    };
    const component = deep(<Login login={loginMock} />);

    component.find('#login-username').simulate('input', usernameMock);
    component.find('#login-username').simulate('change', usernameMock);
    component.find('#login-password').simulate('change', passwordMock);
    component.find('#login-password').simulate('input', passwordMock);
    component.find('button').simulate('click', eventMock);

    expect(loginMock).toHaveBeenCalledWith({
      type: 'email',
      password: 'swordfish',
      identity: 'jane@example.com',
    });
  });

  test('disables button for invalid username and password', (): void => {
    const loginMock = jest.fn();
    const usernameMock = {
      currentTarget: {
        value: 'invalid-username',
      },
    };
    const passwordMock = {
      currentTarget: {
        value: 'swordfish',
      },
    };
    const component = deep(<Login login={loginMock} />);

    component.find('#login-username').simulate('input', usernameMock);
    component.find('#login-username').simulate('change', usernameMock);
    component.find('#login-password').simulate('change', passwordMock);
    component.find('#login-password').simulate('input', passwordMock);

    const attrs: any = component.find('button').attrs();
    expect(attrs.disabled).toBe(true);
    expect(component.state().errors.errors).toEqual({
      username: {
        code: 'invalid_email',
        message: 'Please enter a valid email address',
      },
    });
  });
});
