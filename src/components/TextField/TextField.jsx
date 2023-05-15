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

  state = { isValid: true, canShowValidationMsg: false };

  constructor(props) {
    super(props);
    this.iconRef = React.createRef();
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.iconWidth = this.iconRef.current?.offsetWidth || 0;
    this.inputHeight = this.inputRef.current.offsetHeight;
    // для получения calculated свойств отрендеренных элементов
    // (вероятно, не самый корректный способ)
    this.forceUpdate();
  }

  handleChange = (e, name) => {
    // (e === null) при клике на clearBtn
    const value = e?.target?.value || '';
    const isValid = this.isValid(value);
    const { onChange } = this.props;

    this.setState({ isValid });
    onChange && onChange(e, { name, value, isValid });
  };

  isValid(value) {
    const { pattern = DEF_PATTERN, required = false } = this.props;
    // даже если поле необязательное, но значение введено -
    // проверяем соотвествие паттерну
    return value ? pattern.test(value) : !required;
  }

  handleBlur = e => {
    // разрешаем показывать сообщение для поля,
    // если была хоть одна потеря фокуса с непустым значением
    const { canShowValidationMsg } = this.state;
    if (!canShowValidationMsg)
      this.setState({ canShowValidationMsg: !!e.target.value });

    const { onBlur } = this.props;
    onBlur && onBlur(e);
  };

  render() {
    const { isValid, canShowValidationMsg } = this.state;
    const { handleChange, handleBlur, iconWidth, inputHeight } = this;

    const {
      value,
      // извлекаем onChange,
      // иначе перебьет текущий (*)
      onChange,
      name,
      type,
      label,
      width,
      height,
      // извлекаем pattern и required,
      // чтобы не прокинулось инпуту
      pattern,
      required,
      validationMsg,
      validationMsgColor,
      icon,
      iconSize,
      iconColor,
      ...restProps
    } = this.props;

    const showValidationMsg = canShowValidationMsg && !isValid && validationMsg;

    return (
      // note: если сюда прокинуть весь restProps, и задать, например, для TextField
      // style = {{ border: 1px solid gray}} - рамка будет тут и на Input ниже
      // Надо уточнять пропсы для потомков
      <Field
        width={width}
        height={height}
        // на инпуте не сработает, он не получает фокус
        onBlur={handleBlur}
      >
        <InputWrapper>
          {/* Input */}
          <Input
            name={name}
            type={type || 'text'}
            placeholder={label || name}
            onChange={e => handleChange(e, name)}
            value={value}
            ref={this.inputRef}
            //
            // вычисляемые пропсы
            iconWidth={iconWidth}
            inputHeight={inputHeight}
            showValidationMsg={showValidationMsg}
            {...restProps} // (*)
          />

          {/* Left-side icon */}
          {icon && (
            <Icon
              value={icon}
              size={iconSize}
              color={iconColor}
              ref={this.iconRef}
              //
              // вычисляемые пропсы
              iconWidth={iconWidth}
            />
          )}

          {/* Clear btn */}
          {value && (
            <ClearBtn
              onClick={() => handleChange(null, name)}
              //
              // вычисляемые пропсы
              inputHeight={inputHeight}
            />
          )}
        </InputWrapper>

        {/* Validation msg */}
        {showValidationMsg && (
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
