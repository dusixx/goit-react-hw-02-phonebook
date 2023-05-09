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

  state = { wasCleared: true };

  handleClearInput = () => {
    this.setState({ wasCleared: true });
  };

  handleChange = (...args) => {
    if (this.state.wasCleared) this.setState({ wasCleared: false });
    this.props.onChange(...args);
  };

  render() {
    const { handleChange, handleClearInput } = this;
    const { value, onChange, label, icon, ...restProps } = this.props;
    const { wasCleared } = this.state;

    return (
      <Label {...restProps}>
        <Field>
          {/* text input */}
          <Input
            type="text"
            autoComplete="off"
            placeholder={label}
            onChange={handleChange}
            value={wasCleared ? '' : value}
            {...restProps}
          />
          <LeftSideIcon icon={icon} />
          <ClearInputBtn onClick={handleClearInput} hidden={wasCleared} />
        </Field>
      </Label>
    );
  }
}
