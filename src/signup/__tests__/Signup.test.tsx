import { h } from 'preact';
import { deep } from 'preact-render-spy';

import Signup from '@authenticator/signup/Signup';

describe('Signup Page Test', (): void => {
  test('renders', (): void => {
    const component = deep(<Signup path='/signup' />);
    expect(component.find('#signup-username').exists()).toBeTruthy();
    expect(component.find('#signup-password').exists()).toBeTruthy();
  });
});
