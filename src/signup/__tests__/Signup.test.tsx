import { h } from 'preact';
import { deep } from 'preact-render-spy';

import Signup from '@authenticator/signup/Signup';

describe('Signup Test', (): void => {
  test('accepts username and password in 2 step signup form', (): void => {
    const registerMock = jest.fn();
    const usernameMock = {
      currentTarget: {
        value: 'jane@example.com',
      },
    };
    const eventMock = {
      preventDefault: jest.fn(),
    };
    const passwordMock = {
      currentTarget: {
        value: 'swordfish',
      },
    };
    const component = deep(<Signup register={registerMock} />);

    component.find('#signup-username').simulate('input', usernameMock);
    component.find('#signup-username').simulate('change', usernameMock);
    component.find('button').simulate('click', eventMock);

    expect(registerMock).not.toHaveBeenCalled();
    expect(component.state().isUsernameSet).toBe(true);
    expect(component.state().errors.ok).toBe(true);

    component.find('#new-password').simulate('change', passwordMock);
    component.find('#new-password').simulate('input', passwordMock);
    component.find('#confirmed-password').simulate('change', passwordMock);
    component.find('#confirmed-password').simulate('input', passwordMock);
    component.find('.signup-passwords__btns-primary').simulate('click', eventMock);

    expect(registerMock).toHaveBeenCalledWith({
      identity: 'jane@example.com',
      password: 'swordfish',
      type: 'email',
    });
  });

  test('disables button on invalid username', (): void => {
    const registerMock = jest.fn();
    const usernameMock = {
      currentTarget: {
        value: 'invalid-email',
      },
    };
    const component = deep(<Signup register={registerMock} />);

    component.find('#signup-username').simulate('input', usernameMock);
    component.find('#signup-username').simulate('change', usernameMock);

    const attrs: any = component.find('button').attrs();
    expect(attrs.disabled).toBe(true);

    expect(component.state().errors.errors).toEqual({
      username: {
        code: 'invalid_email',
        message: 'Please enter a valid email address',
      }
    });
  });

  test('disables button on invalid password', (): void => {
    const registerMock = jest.fn();
    const usernameMock = {
      currentTarget: {
        value: 'jane@example.com',
      },
    };
    const eventMock = {
      preventDefault: jest.fn(),
    };
    const passwordMock = {
      currentTarget: {
        value: '123',
      },
    };
    const component = deep(<Signup register={registerMock} />);

    component.find('#signup-username').simulate('input', usernameMock);
    component.find('#signup-username').simulate('change', usernameMock);
    component.find('button').simulate('click', eventMock);

    expect(registerMock).not.toHaveBeenCalled();
    expect(component.state().isUsernameSet).toBe(true);
    expect(component.state().errors.ok).toBe(true);

    component.find('#new-password').simulate('input', passwordMock);
    component.find('#new-password').simulate('change', passwordMock);

    const attrs: any = component.find('.signup-passwords__btns-primary')
      .find('button')
      .first()
      .attrs();
    expect(attrs.disabled).toBe(true);

    expect(component.state().errors.errors).toEqual({
      newPassword: {
        code: 'invalid_password',
        message: 'Password should be at least 8 characters long',
      }
    });
  });
});
