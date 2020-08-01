import { h } from 'preact';
import { deep } from 'preact-render-spy';

import Contact from '@authenticator/contact/Contact';

describe('Contact Test', (): void => {
  test('submits user address', (): void => {
    const requestMock = jest.fn();
    const addressMock = {
      currentTarget: {
        value: 'jane@example.com',
      },
    };
    const eventMock = {
      preventDefault: jest.fn(),
    };
    const component = deep(<Contact checkAddress={requestMock} />);

    component.find('#contact-address').simulate('input', addressMock);
    component.find('#contact-address').simulate('change', addressMock);
    component.find('button').simulate('click', eventMock);

    expect(requestMock).toHaveBeenCalledWith({
      deliveryMethod: 'email',
      address: 'jane@example.com',
    });
  });

  it('disables button for invalid address', (): void => {
    const requestMock = jest.fn();
    const addressMock = {
      currentTarget: {
        value: 'invalid-email',
      },
    };
    const component = deep(<Contact checkAddress={requestMock} />);

    component.find('#contact-address').simulate('input', addressMock);
    component.find('#contact-address').simulate('change', addressMock);

    const attrs: any = component.find('button').attrs();
    expect(attrs.disabled).toBe(true);

    expect(component.state().errors.errors).toEqual({
      address: {
        code: 'invalid_email',
        message: 'Please enter a valid email address',
      }
    });
  });
});
