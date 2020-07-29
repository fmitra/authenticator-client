import { h, Component } from 'preact';

import { Disclaimer } from '@authenticator/ui/components';
import { Button, InputContact } from '@authenticator/form';
import { ContactHeader } from '@authenticator/contact/components';
import { DeliveryRequest } from '@authenticator/requests';
import { NullAppError, FormErrors } from '@authenticator/errors';
import { ContactMethod } from '@authenticator/identity/contact';

export interface Props {
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

    this.state = {
      deliveryMethod: '',
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

  handleAddress = (address: string, method: ContactMethod, error: NullAppError): void => {
    this.state.errors.update(error, 'address');
    this.state.errors.update(null, 'request');

    this.setState({
      address: address,
      deliveryMethod: method,
      errors: this.state.errors,
    });
  }

  handleSubmit = (): void => {
    this.props.checkAddress({
      deliveryMethod: this.state.deliveryMethod,
      address: this.state.address,
    });
  }

  render(): JSX.Element {
    return (
      <div class='contact'>
        <form class='contact-form'>
          <ContactHeader />
          <InputContact
            error={
              this.state.errors.get('address') ||
              this.state.errors.get('request')
            }
            onChange={this.handleAddress}
            language={window.navigator.language || ''}
            value={this.state.address}
            class='contact-input'
            id='contact-address' />

          <Button
            name='Send Code'
            class='contact-btn'
            hasError={this.state.errors.notOk}
            isDisabled={this.props.isRequesting}
            onClick={this.handleSubmit} />
          <Disclaimer />
        </form>
      </div>
    );
  }
};
