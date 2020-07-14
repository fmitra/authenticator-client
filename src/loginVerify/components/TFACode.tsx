import { h, Component  } from 'preact';

import { Button, Input } from '@authenticator/form';
import { VerifyCodeRequest } from '@authenticator/requests';
import { FormErrors } from '@authenticator/errors';

interface State {
  code: string;
}

interface Props {
  errors: FormErrors;
  isRequesting: boolean;
  handleSubmit: { (data: VerifyCodeRequest): any };
}

export default class TFACode extends Component<Props, State> {
  handleCode = (e: Event): void => {
    const { value } = (e.currentTarget as HTMLFormElement);
    this.setState({ code: value });
  }

  render(): JSX.Element {
    return (
      <div class='tfa-code'>
        <Input
          class='tfa-code__input'
          id='tfa-code'
          label='Code'
          type='string'
          onChange={this.handleCode} />

        <Button
          name='Submit'
          hasError={this.props.errors.notOk}
          isDisabled={this.props.isRequesting}
          onClick={() => this.props.handleSubmit({ code: this.state.code })} />
      </div>
    );
  }
};
