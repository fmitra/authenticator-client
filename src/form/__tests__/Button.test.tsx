import { h } from 'preact';
import { deep } from 'preact-render-spy';

import Button from '@authenticator/form/Button';

describe('Button Test', (): void => {
  test('it renders with name', (): void => {
    const component = deep(<Button
      isDisabled={false}
      hasError={false}
      onClick={(): void => {}}
      name='Submit'
    />);
    expect(component.find('button').text()).toBe('Submit')
  });

  test('enters disabled state with disabled property', (): void => {
    const component = deep(<Button
      isDisabled={true}
      hasError={false}
      onClick={(): void => {}}
      name='Submit'
    />);
    const attrs: any = component.find('button').attrs();
    expect(attrs.disabled).toBe(true);
  });

  test('enters a disabled state with error property', (): void => {
    const component = deep(<Button
      isDisabled={false}
      hasError={true}
      onClick={(): void => {}}
      name='Submit'
    />);
    const attrs: any = component.find('button').attrs();
    expect(attrs.disabled).toBe(true);
  });

  test('triggers click handler', (): void => {
    const onClickMock = jest.fn();
    const eventMock = { preventDefault: jest.fn() };
    const component = deep(<Button
      isDisabled={false}
      hasError={false}
      onClick={onClickMock}
      name='Submit'
    />);
    component.find('[onClick]').simulate('click', eventMock);
    expect(onClickMock).toHaveBeenCalled();
    expect(eventMock.preventDefault).toHaveBeenCalled();
  });
});
