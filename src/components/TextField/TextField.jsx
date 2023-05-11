import { Component } from 'react';
import PropTypes from 'prop-types';
import { VscClose } from 'react-icons/vsc';

import {
  Label,
  Field,
  Input,
  IconWrapper,
  ClearInputBtn,
} from './TextField.styled';

const Icon = ({ value: ReactIcon }) => {
  return (
    ReactIcon && (
      <IconWrapper>
        <ReactIcon size="100%" />
      </IconWrapper>
    )
  );
};

const ClearBtn = ({ onClick, hidden }) => (
  <ClearInputBtn
    type="button"
    onClick={onClick}
    // с visibility небольшая пауза
    style={{ display: hidden ? 'none' : 'flex' }}
  >
    <VscClose size="100%" />
  </ClearInputBtn>
);

ClearBtn.propTypes = {
  onClick: PropTypes.func,
  hidden: PropTypes.bool.isRequired,
};

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

  handleClearInput = e => {
    this.setState({ isEmpty: true });
    this.props.onChange(null);
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
          <Input
            type="text"
            autoComplete="off"
            placeholder={label}
            onChange={handleChange}
            value={isEmpty ? '' : value}
            {...restProps}
          />
          <Icon value={icon} />
          <ClearBtn onClick={handleClearInput} hidden={isEmpty} />
        </Field>
      </Label>
    );
  }
}
