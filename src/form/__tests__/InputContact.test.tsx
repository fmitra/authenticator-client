import { h } from 'preact';
import { deep } from 'preact-render-spy';

import InputContact from '@authenticator/form/InputContact';
import { PHONE, EMAIL } from '@authenticator/identity/contact';

describe('InputContact Test', (): void => {
  test('it validates an email address', (): void => {
    const eventMock = {
      currentTarget: {
        value: 'jane@example.com',
      },
    };
    const onChangeMock = jest.fn();
    const onInputMock = jest.fn();
    const component = deep(<InputContact
      class='input-username'
      id='input-username'
      value=''
      error={null}
      label='Username'
      language='en-US'
      onChange={onChangeMock}
      onInput={onInputMock}
    />);
    component.find('input').simulate('input', eventMock);
    expect(onInputMock).toHaveBeenCalledWith('jane@example.com', EMAIL)

    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith(eventMock, null)
  });

  test('it validates a phone number', (): void => {
    const eventMock = {
      currentTarget: {
        value: '(555) 555-5555',
      },
    };
    const onChangeMock = jest.fn();
    const onInputMock = jest.fn();
    const component = deep(<InputContact
      class='input-username'
      id='input-username'
      value=''
      error={null}
      label='Username'
      language='en-US'
      onChange={onChangeMock}
      onInput={onInputMock}
    />);
    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith(eventMock, null)

    component.find('input').simulate('input', eventMock);
    expect(onInputMock).toHaveBeenCalledWith('+15555555555', PHONE)
  });

  test('it invalidates an email address', (): void => {
    const eventMock = {
      currentTarget: {
        value: 'jane@example',
      },
    };
    const onChangeMock = jest.fn();
    const onInputMock = jest.fn();
    const component = deep(<InputContact
      class='input-username'
      id='input-username'
      label='Username'
      value=''
      error={null}
      language='en-US'
      onChange={onChangeMock}
      onInput={onInputMock}
    />);
    component.find('input').simulate('input', eventMock);
    expect(onInputMock).toHaveBeenCalledWith('jane@example', EMAIL);

    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith(eventMock, {
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
    const onInputMock = jest.fn();
    const component = deep(<InputContact
      class='input-username'
      id='input-username'
      label='Username'
      value=''
      error={null}
      language=''
      onChange={onChangeMock}
      onInput={onInputMock}
    />);
    component.find('input').simulate('input', eventMock);
    expect(onInputMock).toHaveBeenCalledWith('5555555555', PHONE)

    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith(eventMock, {
      message: 'Please include your country code with your phone number',
      code: 'invalid_phone',
    })
  });
});
