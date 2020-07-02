import { h } from 'preact';
import { deep } from 'preact-render-spy';

import InputPhone from '@authenticator/form/InputPhone';

describe('Input Phone Test', (): void => {
  test('it validates a phone number', (): void => {
    const eventMock = {
      currentTarget: {
        value: '+15555555555',
      },
    };
    const onChangeMock = jest.fn();
    const component = deep(<InputPhone
      class='input-phone'
      id='input-phone'
      label='Phone'
      onChange={onChangeMock}
     />);
    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith(eventMock, null)
  });

  test('it invalidates a phone number', (): void => {
    const eventMock = {
      currentTarget: {
        value: '123',
      },
    };
    const onChangeMock = jest.fn();
    const component = deep(<InputPhone
      class='input-phone'
      id='input-phone'
      label='Phone'
      onChange={onChangeMock}
     />);
    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith(eventMock, {
      code: 'invalid_phone',
      message: 'Please enter a valid phone',
    })
  });
});
