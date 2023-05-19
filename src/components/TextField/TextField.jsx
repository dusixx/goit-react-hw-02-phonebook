import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, ClearBtn } from './Comps';
import {
  Field,
  InputWrapper,
  Input,
  ValidationMessage,
} from './TextField.styled';

//
// TextField
//

const DEF_PATTERN = /[\s\S]*/;

export class TextField extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    pattern: PropTypes.instanceOf(RegExp),
    required: PropTypes.bool,
    validationMsg: PropTypes.string,
    validationMsgColor: PropTypes.string,
    icon: PropTypes.func,
    iconColor: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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

  isValid(value) {
    const { pattern = DEF_PATTERN, required = false } = this.props;
    // даже если поле необязательное, но значение введено -
    // проверяем соотвествие паттерну
    return value ? pattern.test(value) : !required;
  }

  handleChange = (e, name) => {
    // (e === null) при клике на clearBtn
    const value = e?.target?.value || '';
    const isValid = this.isValid(value);
    const { onChange } = this.props;

    this.setState({ isValid });
    onChange && onChange(e, { name, value, isValid });
  };

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
      // NOTE: если сюда прокинуть весь restProps, и задать, например, для TextField
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
            showValidationMsg={showValidationMsg}
            value={value}
            ref={this.inputRef}
            //
            // вычисляемые пропсы
            iconWidth={iconWidth}
            inputHeight={inputHeight}
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
