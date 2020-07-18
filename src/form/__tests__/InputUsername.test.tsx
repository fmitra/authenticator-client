import { h } from 'preact';
import { deep } from 'preact-render-spy';

import InputUsername from '@authenticator/form/InputUsername';
import { PHONE, EMAIL } from '@authenticator/identity/contact';

describe('InputUsername Test', (): void => {
  test('it validates an email address', (): void => {
    const eventMock = {
      currentTarget: {
        value: 'jane@example.com',
      },
    };
    const onChangeMock = jest.fn();
    const component = deep(<InputUsername
      class='input-username'
      id='input-username'
      label='Username'
      language='en-US'
      onChange={onChangeMock}
    />);
    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith('jane@example.com', EMAIL, null)
  });

  test('it validates a phone number', (): void => {
    const eventMock = {
      currentTarget: {
        value: '(555) 555-5555',
      },
    };
    const onChangeMock = jest.fn();
    const component = deep(<InputUsername
      class='input-username'
      id='input-username'
      label='Username'
      language='en-US'
      onChange={onChangeMock}
    />);
    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith('+15555555555', PHONE, null)
  });

  test('it invalidates an email address', (): void => {
    const eventMock = {
      currentTarget: {
        value: 'jane@example',
      },
    };
    const onChangeMock = jest.fn();
    const component = deep(<InputUsername
      class='input-username'
      id='input-username'
      label='Username'
      language='en-US'
      onChange={onChangeMock}
    />);
    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith('jane@example', EMAIL, {
      message: 'Please enter a valid email address',
      code: 'invalid_email',
    })
  });

  test('it invalidates a phone number', (): void => {
    const eventMock = {
      currentTarget: {
        value: '5555555555',
      },
    };
    const onChangeMock = jest.fn();
    const component = deep(<InputUsername
      class='input-username'
      id='input-username'
      label='Username'
      language=''
      onChange={onChangeMock}
    />);
    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith('5555555555', PHONE, {
      message: 'Please include your country code with your phone number',
      code: 'invalid_phone',
    })
  });
});
