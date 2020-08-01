import { h } from 'preact';
import { deep } from 'preact-render-spy';

import Device from '@authenticator/device/Device';

describe('Device Test', (): void => {
  test('it initializes device registration', (): void => {
    const eventMock = {
      preventDefault: jest.fn(),
    };

    const registrationMock = jest.fn();
    const component = deep(<Device registerDevice={registrationMock} />);

    component.find('button').simulate('click', eventMock);
    expect(registrationMock).toHaveBeenCalled();
  });
});
