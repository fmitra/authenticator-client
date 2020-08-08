import { h, Component } from 'preact';

import { InputCode, Button } from '@authenticator/form';
import { NullAppError, FormErrors } from '@authenticator/errors';
import { TOTPRequest } from '@authenticator/requests';
import { TOTPHeader } from '@authenticator/totpDisable/components';
import { AppLayout, Disclaimer } from '@authenticator/ui/components';

interface State {
  errors: FormErrors;
  code: string;
}

interface Props {
  error: NullAppError;
  disable: { (data: TOTPRequest): any };
  isRequesting: boolean;
}

export default class TOTPDisable extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      errors: new FormErrors(),
      code: '',
    }
  }

  static defaultProps = {
    error: null,
    disable: (data: TOTPRequest): void => {},
    isRequesting: false,
    isDisabled: false,
  }

  componentWillReceiveProps(props: Props, state: State): void {
    this.setState({
      errors: this.state.errors.update(props.error, 'request'),
    });
  }

  handleCode = (code: string): void => {
    this.setErrors('code', null, false);
    this.setState({
      code: code,
      errors: this.state.errors,
    });
  }

  handleSubmit = (): void => {
    this.props.disable({ code: this.state.code });
  }

  setErrors = (key: string, error: NullAppError, withState: boolean = true): void => {
    this.state.errors
      .update(error, key)
      .update(null, 'request');
    if (withState) {
      this.setState({ errors: this.state.errors });
    }
  }

  render(): JSX.Element {
    return (
      <AppLayout class='container--graphic totp'>
        <TOTPHeader />
        <InputCode
          value={this.state.code}
          id='totp-disable-code'
          error={this.state.errors.any()}
          onChange={(evt: Event, error: NullAppError): void => {
            this.setErrors('code', error);
          }}
          onInput={this.handleCode} />
        <Button
          class='button--wide'
          name='Submit'
          hasError={this.state.errors.notOk}
          isDisabled={this.props.isRequesting || !this.state.code}
          onClick={this.handleSubmit} />
        <Disclaimer />
      </AppLayout>
    );
  }
};
