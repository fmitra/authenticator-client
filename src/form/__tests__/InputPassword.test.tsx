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
    const component = deep(<InputPassword
      class='input-password'
      id='input-password'
      label='Password'
      onChange={onChangeMock}
     />);
    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith(eventMock, null)
  });

  test('it invalidates a password', (): void => {
    const eventMock = {
      currentTarget: {
        value: '123',
      },
    };
    const onChangeMock = jest.fn();
    const component = deep(<InputPassword
      class='input-password'
      id='input-password'
      label='Password'
      onChange={onChangeMock}
     />);
    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith(eventMock, {
      code: 'invalid_password',
      message: 'Password should be at least 8 characters long',
    })
  });
});
