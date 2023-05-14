import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VscClose as IconClose } from 'react-icons/vsc';

import {
  Field,
  InputWrapper,
  Input,
  IconWrapper,
  ClearInputBtn,
  ValidationMessage,
} from './TextField.styled';

//
// Icon
//

const Icon = React.forwardRef(
  ({ value: ReactIcon, size, color, iconWidth }, ref) => {
    return (
      ReactIcon && (
        <IconWrapper ref={ref} size={size} iconWidth={iconWidth}>
          <ReactIcon size="100%" color={color} />
        </IconWrapper>
      )
    );
  }
);

Icon.propTypes = {
  value: PropTypes.func,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

//
// Clear btn
//

const ClearBtn = ({ onClick, inputHeight }) => {
  return (
    <ClearInputBtn type="button" onClick={onClick} inputHeight={inputHeight}>
      <IconClose size="100%" />
    </ClearInputBtn>
  );
};

ClearBtn.propTypes = {
  onClick: PropTypes.func,
};

//
// TextField
//

const DEF_PATTERN = /[\s\S]*/;

export class TextField extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onValidate: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    pattern: PropTypes.instanceOf(RegExp),
  };

  constructor(props) {
    super(props);
    this.iconRef = React.createRef();
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.iconWidth = this.iconRef.current?.offsetWidth || 0;
    this.inputHeight = this.inputRef.current.offsetHeight;
    this.forceUpdate();
  }

  handleChange = (e, ...restArgs) => {
    const { onChange } = this.props;
    onChange && onChange(e, ...restArgs);
  };

  handleBlur = (e, ...restArgs) => {
    const { onBlur } = this.props;
    onBlur && onBlur(e, ...restArgs);
  };

  render() {
    const { handleChange, handleBlur, iconWidth, inputHeight } = this;

    const {
      value,
      // извлекаем из props,
      // иначе перебьет текущий из { ...restProps } (*)
      onChange,
      name,
      type,
      label,
      width,
      height,
      // validation
      pattern = DEF_PATTERN,
      required,
      validationMsg,
      validationMsgColor,
      // icon
      icon,
      iconSize,
      iconColor,
      ...restProps
    } = this.props;

    return (
      // note: если сюда прокинуть весь restProps, и задать, например, для TextField
      // style = {{ border: 1px solid gray}} - рамка будет тут и на Input ниже
      // Надо уточнять пропсы для потомков
      <Field
        width={width}
        height={height}
        //
        // на инпуте не сработает, он не получает фокус
        // note: через раз приходит 2 аргумент-объект
        // В консоле видно, что каждый раз вызывается дважды
        // onBlur={e => handleBlur(e, { name, pattern, required })}
        //
        onBlur={handleBlur}
      >
        <InputWrapper>
          {/* Input */}
          <Input
            type={type || 'text'}
            name={name}
            placeholder={label || name}
            onChange={e => handleChange(e, { name, pattern, required })}
            value={value}
            validationMsg={validationMsg}
            ref={this.inputRef}
            // calculated
            iconWidth={iconWidth}
            inputHeight={inputHeight}
            // (*)
            {...restProps}
          />
          {/* Left-side icon */}
          {icon && (
            <Icon
              value={icon}
              size={iconSize}
              color={iconColor}
              ref={this.iconRef}
              // calculated
              iconWidth={iconWidth}
            />
          )}
          {/* Clear btn */}
          {value && (
            <ClearBtn
              onClick={() => handleChange(null, { name, pattern, required })}
              // calculated
              inputHeight={inputHeight}
            />
          )}
        </InputWrapper>
        {/* Validation msg */}
        {validationMsg && (
          <ValidationMessage
            inputHeight={inputHeight}
            color={validationMsgColor}
          >
            {validationMsg}
          </ValidationMessage>
        )}
      </Field>
    );
  }
}
