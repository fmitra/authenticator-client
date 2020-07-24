import { h, Component } from 'preact';

import { Input, Button } from '@authenticator/form';
import { VerifyContactRequest } from '@authenticator/requests';
import { NullAppError, FormErrors, Errors } from '@authenticator/errors';

interface Props {
  error: NullAppError;
  verify: { (data: VerifyContactRequest): any };
  isRequesting: boolean;
}

interface State {
  code: string;
  errors: FormErrors;
}

export default class ContactVerify extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      code: '',
      errors: new FormErrors(),
    }
  }

  static defaultProps = {
    error: null,
    verify: (data: VerifyContactRequest): void => {},
    isRequesting: false,
  };

  componentWillReceiveProps(props: Props, state: State): void {
    this.setState({ errors: this.state.errors.update(props.error, 'request') });
  }

  handleCode = (e: Event): void => {
    const { value } = (e.currentTarget as HTMLFormElement);
    this.setState({ code: value });
  }

  handleSubmit = (): void => {
    this.props.verify({
      isDisabled: false,
      code: this.state.code,
    });
  }

  render(): JSX.Element {
    return (
      <div class='contact-verify'>
        <form class='contact-verify-form'>
          <Input
            class='contact-verify-input'
            label='Code'
            type='string'
            id='contact-verify-code'
            onChange={this.handleCode} />

          <Errors class='contact__errors' errors={this.state.errors} />

          <Button
            name='Submit'
            hasError={this.state.errors.notOk}
            isDisabled={this.props.isRequesting}
            onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
};
