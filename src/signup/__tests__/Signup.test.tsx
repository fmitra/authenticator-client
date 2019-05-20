import { h } from 'preact';
import { shallow } from 'preact-render-spy';

import Signup from '@authenticator/signup/Signup';

describe('Signup Page Test', (): void => {
  it('renders', (): void => {
    const component = shallow(<Signup path='/signup' />);
    expect(component.find('#signup-username-email').exists()).toBeTruthy();
    expect(component.find('#signup-password').exists()).toBeTruthy();
  });
});
