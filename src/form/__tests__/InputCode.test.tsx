import { h } from 'preact';
import { deep } from 'preact-render-spy';

import InputCode from '@authenticator/form/InputCode';

describe('InputCode Test', (): void => {
  test('it validates a 2FA code', (): void => {
    const eventMock = {
      currentTarget: {
        value: '123456',
      },
    };
    const onChangeMock = jest.fn();
    const onInputMock = jest.fn();
    const component = deep(<InputCode
      id='input-code'
      value=''
      error={null}
      onChange={onChangeMock}
      onInput={onInputMock}
    />);
    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith(eventMock, null)

    component.find('input').simulate('input', eventMock);
    expect(onInputMock).toHaveBeenCalledWith('123456');
  });

  test('it invalidates a 2FA code', (): void => {
    const eventMock = {
      currentTarget: {
        value: '123',
      },
    };
    const onChangeMock = jest.fn();
    const onInputMock = jest.fn();
    const component = deep(<InputCode
      id='input-code'
      value=''
      error={null}
      onChange={onChangeMock}
      onInput={onInputMock}
    />);
    component.find('input').simulate('change', eventMock);
    expect(onChangeMock).toHaveBeenCalledWith(eventMock, {
      code: 'invalid_code',
      message: 'Code should be at least 6 characters long',
    })

    component.find('input').simulate('input', eventMock);
    expect(onInputMock).toHaveBeenCalledWith('123');
  });
});
