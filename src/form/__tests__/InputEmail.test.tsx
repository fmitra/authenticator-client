import { h } from 'preact';
import { deep } from 'preact-render-spy';

import InputEmail from '@authenticator/form/InputEmail';

describe('InputEmail Test', (): void => {
  test('it validates an email address', (): void => {
    const eventMock = {
      currentTarget: {
        value: 'jane@example.com',
      },
    };
    const onChangeMock = jest.fn();
    const component = deep(<InputEmail
      class='input-email'
      id='input-email'
      label='Email'
      onChange={onChangeMock}
    />);
    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith(eventMock, null)
  });

  test('it invalidates an email address', (): void => {
    const eventMock = {
      currentTarget: {
        value: 'bad email',
      },
    };
    const onChangeMock = jest.fn();
    const component = deep(<InputEmail
      class='input-email'
      id='input-email'
      label='Email'
      onChange={onChangeMock}
    />);
    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith(eventMock, {
      code: 'invalid_email',
      message: 'Please enter a valid email address',
    })
  });
});
