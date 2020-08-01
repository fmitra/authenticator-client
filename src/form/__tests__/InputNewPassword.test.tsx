import { h } from 'preact';
import { deep } from 'preact-render-spy';

import InputNewPassword from '@authenticator/form/InputNewPassword';

describe('InputNewPassword Test', (): void => {
  test('it validates a new password', (): void => {
    const eventMock = {
      currentTarget: {
        value: '12345678',
      },
    };
    const onPwdNewChangeMock = jest.fn();
    const onPwdNewInputMock = jest.fn();
    const onPwdCfmChangeMock = jest.fn();
    const onPwdCfmInputMock = jest.fn();
    const component = deep(<InputNewPassword
      id='new-password-input'
      onConfirmPasswordInput={onPwdCfmInputMock}
      onNewPasswordInput={onPwdNewInputMock}
      onConfirmPasswordChange={onPwdCfmChangeMock}
      onNewPasswordChange={onPwdNewChangeMock}
      newPasswordError={null}
      confirmPasswordError={null}
    />);
    component.find('#new-password').simulate('change', eventMock);
    expect(onPwdNewChangeMock).toHaveBeenCalledWith(null)

    component.find('#new-password').simulate('input', eventMock);
    expect(onPwdNewInputMock).toHaveBeenCalled();
  });

  test('it invalidates a new password', (): void => {
    const eventMock = {
      currentTarget: {
        value: '123456',
      },
    };
    const onPwdNewChangeMock = jest.fn();
    const onPwdNewInputMock = jest.fn();
    const onPwdCfmChangeMock = jest.fn();
    const onPwdCfmInputMock = jest.fn();
    const component = deep(<InputNewPassword
      id='new-password-input'
      onConfirmPasswordInput={onPwdCfmInputMock}
      onNewPasswordInput={onPwdNewInputMock}
      onConfirmPasswordChange={onPwdCfmChangeMock}
      onNewPasswordChange={onPwdNewChangeMock}
      newPasswordError={null}
      confirmPasswordError={null}
    />);
    component.find('#new-password').simulate('change', eventMock);
    expect(onPwdNewChangeMock).toHaveBeenCalledWith({
      code: 'invalid_password',
      message: 'Password should be at least 8 characters long',
    })

    component.find('#new-password').simulate('input', eventMock);
    expect(onPwdNewInputMock).toHaveBeenCalled();
  });

  test('it validates a password confirmation', (): void => {
    const eventMock = {
      currentTarget: {
        value: '12345678',
      },
    };
    const onPwdNewChangeMock = jest.fn();
    const onPwdNewInputMock = jest.fn();
    const onPwdCfmChangeMock = jest.fn();
    const onPwdCfmInputMock = jest.fn();
    const component = deep(<InputNewPassword
      id='new-password-input'
      onConfirmPasswordInput={onPwdCfmInputMock}
      onNewPasswordInput={onPwdNewInputMock}
      onConfirmPasswordChange={onPwdCfmChangeMock}
      onNewPasswordChange={onPwdNewChangeMock}
      newPasswordError={null}
      confirmPasswordError={null}
    />);
    component.find('#new-password').simulate('change', eventMock);
    component.find('#new-password').simulate('input', eventMock);

    component.find('#confirmed-password').simulate('change', eventMock);
    expect(onPwdCfmChangeMock).toHaveBeenCalledWith(null)

    component.find('#confirmed-password').simulate('input', eventMock);
    expect(onPwdCfmInputMock).toHaveBeenCalledWith('12345678')
  });

  test('it invalidates a password confirmation', (): void => {
    const newPwdEventMock = {
      currentTarget: {
        value: '12345678',
      },
    };
    const cfmPwdEventMock = {
      currentTarget: {
        value: '12345679',
      },
    };
    const onPwdNewChangeMock = jest.fn();
    const onPwdNewInputMock = jest.fn();
    const onPwdCfmChangeMock = jest.fn();
    const onPwdCfmInputMock = jest.fn();
    const component = deep(<InputNewPassword
      id='new-password-input'
      onConfirmPasswordInput={onPwdCfmInputMock}
      onNewPasswordInput={onPwdNewInputMock}
      onConfirmPasswordChange={onPwdCfmChangeMock}
      onNewPasswordChange={onPwdNewChangeMock}
      newPasswordError={null}
      confirmPasswordError={null}
    />);
    component.find('#new-password').simulate('change', newPwdEventMock);
    component.find('#new-password').simulate('input', newPwdEventMock);

    component.find('#confirmed-password').simulate('change', cfmPwdEventMock);
    expect(onPwdCfmChangeMock).toHaveBeenCalledWith({
      code: 'invalid_password',
      message: 'Passwords do not match',
    })

    component.find('#confirmed-password').simulate('input', cfmPwdEventMock);
    expect(onPwdCfmInputMock).toHaveBeenCalledWith('12345679')
  });
});
