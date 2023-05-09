import { Component } from 'react';
import PropTypes from 'prop-types';
import { VscClose as IconClose } from 'react-icons/vsc';

import {
  Label,
  Field,
  Input,
  IconWrapper,
  ClearInput,
} from './TextField.styled';

//
// Left-side icon
//

const LeftSideIcon = ({ icon: Icon }) => {
  return (
    Icon && (
      <IconWrapper>
        <Icon size="100%" />
      </IconWrapper>
    )
  );
};

//
// Clear btn
//

const ClearInputBtn = ({ onClick, hidden }) => (
  <ClearInput
    type="button"
    onClick={onClick}
    style={{ visibility: hidden ? 'hidden' : 'visible' }}
  >
    <IconClose size="100%" />
  </ClearInput>
);

//
// TextField
//

export class TextField extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    icon: PropTypes.func,
  };

  state = { isEmpty: true };

  handleClearInput = () => {
    this.setState({ isEmpty: true });
  };

  handleChange = (e, ...rest) => {
    this.setState({ isEmpty: !e.target.value });
    this.props.onChange(e, ...rest);
  };

  render() {
    const { handleChange, handleClearInput } = this;
    const { value, onChange, label, icon, ...restProps } = this.props;
    const { isEmpty } = this.state;

    return (
      <Label {...restProps}>
        <Field>
          {/* text input */}
          <Input
            type="text"
            autoComplete="off"
            placeholder={label}
            onChange={handleChange}
            value={isEmpty ? '' : value}
            {...restProps}
          />
          <LeftSideIcon icon={icon} />
          <ClearInputBtn onClick={handleClearInput} hidden={isEmpty} />
        </Field>
      </Label>
    );
  }
}
