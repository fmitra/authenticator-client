import { h, Component } from 'preact';

import config from '@authenticator/config';
import { Button, InputEmail, InputPhone } from '@authenticator/form';
import { DeliveryRequest } from '@authenticator/requests';
import { NullAppError, FormErrors, Errors } from '@authenticator/errors';
import { AddressToggle } from '@authenticator/contact/components';
import { PHONE, EMAIL, ContactMethod } from '@authenticator/identity/contact';

export interface Props {
  path?: string;
  error: NullAppError;
  checkAddress: { (data: DeliveryRequest): any };
  isRequesting: boolean;
}

interface State {
  deliveryMethod: ContactMethod;
  address: string;
  errors: FormErrors;
}

export default class Contact extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let deliveryMethod: ContactMethod = EMAIL;

    if (!config.validUserIdentity.email && config.validUserIdentity.phone) {
      deliveryMethod = PHONE;
    }

    this.state = {
      deliveryMethod,
      address: '',
      errors: new FormErrors(),
    };
  }

  static defaultProps = {
    error: null,
    checkAddress: (data: DeliveryRequest): void => {},
    isRequesting: false,
  };

  componentWillReceiveProps(props: Props, state: State): void {
    this.setState({
      errors: this.state.errors.update(props.error, 'request'),
    });
  }

  handleToggleID = (): void => {
    const newIDType = this.state.deliveryMethod === PHONE
      ? EMAIL
      : PHONE;

    this.setState({ deliveryMethod: newIDType });
  }

  handleAddress = (evt: Event, error: NullAppError): void => {
    const { value } = (evt.currentTarget as HTMLFormElement);
    this.setState({
      address: value,
      errors: this.state.errors.update(error, 'address'),
    });
  }

  handleSubmit = (): void => {
    this.props.checkAddress({
      deliveryMethod: this.state.deliveryMethod,
      address: this.state.address,
    });
  }

  render(): JSX.Element {
    const renderAddressToggle = (
      config.validUserIdentity.email &&
      config.validUserIdentity.phone
    );
    const renderEmail = this.state.deliveryMethod === EMAIL;
    const renderPhone = this.state.deliveryMethod === PHONE;

    return (
      <div class='contact'>
        Contact
        <form class='contact-form'>
          { renderEmail && <InputEmail
            onChange={this.handleAddress}
            class='contact-input'
            label='Email'
            id='contact-address-email' /> }
          { renderPhone && <InputPhone
            onChange={this.handleAddress}
            class='contact-input'
            label='Phone'
            id='contact-address-phone' /> }
          { renderAddressToggle && <AddressToggle
            onClick={this.handleToggleID}
            activeID={this.state.deliveryMethod} /> }

          <Errors class='contact__errors' errors={this.state.errors} />

          <Button
            name='Send Code'
            hasError={this.state.errors.notOk}
            isDisabled={this.props.isRequesting}
            onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }

};
