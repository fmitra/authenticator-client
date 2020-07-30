import { h } from 'preact';
import { deep } from 'preact-render-spy';

import InputPassword from '@authenticator/form/InputPassword';

describe('Input Password Test', (): void => {
  test('it validates a password', (): void => {
    const eventMock = {
      currentTarget: {
        value: '123456789',
      },
    };
    const onChangeMock = jest.fn();
    const onInputMock = jest.fn();
    const component = deep(<InputPassword
      class='input-password'
      value=''
      error={null}
      id='input-password'
      label='Password'
      onInput={onInputMock}
      onChange={onChangeMock}
    />);
    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith(eventMock, null)

    component.find('input').simulate('input', eventMock);
    expect(onInputMock).toHaveBeenCalledWith('123456789');
  });

  test('it invalidates a password', (): void => {
    const eventMock = {
      currentTarget: {
        value: '123',
      },
    };
    const onChangeMock = jest.fn();
    const onInputMock = jest.fn();
    const component = deep(<InputPassword
      class='input-password'
      id='input-password'
      value=''
      error={null}
      label='Password'
      onChange={onChangeMock}
      onInput={onInputMock}
    />);
    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith(eventMock, {
      code: 'invalid_password',
      message: 'Password should be at least 8 characters long',
    })

    component.find('input').simulate('input', eventMock);
    expect(onInputMock).toHaveBeenCalledWith('123');
  });
});
