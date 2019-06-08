import { h } from 'preact';
import { deep } from 'preact-render-spy';

import Input from '@authenticator/form/Input';
import { NullAppError } from '@authenticator/errors';

describe('Input Test', (): void => {
  test('renders input type', (): void => {
    const component = deep(<Input
      label='Username'
      type='text'
      class='signup-username'
      onChange={ (evt: Event, error: NullAppError): void => {} }
      id='signup-username'
    />);
    const attrs: any = component.find('input').attrs();
    expect(attrs.type).toBe('text');
  });

  test('triggers input handler with no validator on change', (): void => {
    const eventMock = {
      currentTarget: {
        value: 'jane@example.com',
      },
    };
    const onChangeMock = jest.fn();
    const component = deep(<Input
      label='Username'
      type='text'
      class='signup-username'
      onChange={ onChangeMock }
      id='signup-username'
    />);

    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith(eventMock, null)
  });

  test('triggers input handler with validator on change', (): void => {
    const error = {
      message: 'Something bad happened',
      code: 'whoops',
    }
    const validatorMock = (v: string | number): NullAppError => error;
    const eventMock = {
      currentTarget: {
        value: 'jane@example.com',
      },
    };
    const onChangeMock = jest.fn();
    const component = deep(<Input
      label='Username'
      type='text'
      class='signup-username'
      validator={ validatorMock }
      onChange={ onChangeMock }
      id='signup-username'
    />);

    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith(eventMock, error);
  });
});
