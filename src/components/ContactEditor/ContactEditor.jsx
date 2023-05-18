import React, { Component } from 'react';
import { TextField } from 'components/TextField/TextField';
import { IconClose } from 'styles/icons';
import { Form, CloseBtn, Title, SaveBtn } from './ContactEditor.styled';
import { fieldData, initialState } from './fieldData';
import PropTypes from 'prop-types';

//
// Contact editor
//

export class ContactEditor extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    title: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  // fieldName: {value: string, isValid: bool}
  state = initialState;

  componentDidMount() {
    // ставим значения полей, если заданы
    this.formHeight = this.formRef.current.offsetHeight;
    this.setFieldValues();
    // для получения formHeight отрендеренной формы
    // (вероятно, не самый корректный способ)
    this.forceUpdate();
  }

  // ставит начальные значения для полей,
  // заданные в пропсе fieldValues массивом[fieldValue1, fieldValue2, ...]
  setFieldValues() {
    const { fieldValues: vals } = this.props;
    if (!Array.isArray(vals)) return;

    Object.keys(this.state).forEach((name, idx) => {
      const value = vals[idx] || '';
      this.setState({ [name]: { value, isValid: true } });
    });
  }

  // вернет объект {fieldName: value, ...}
  getFormData() {
    return Object.entries(this.state).reduce((res, [key, data]) => {
      res[key] = data.value.trim();
      return res;
    }, {});
  }

  resetForm() {
    this.setState(initialState);
  }

  // проверяет валидны ли все поля
  isFormDataValid = () =>
    !Object.values(this.state).some(({ isValid }) => !isValid);

  handleInputChange = (e, { name, value, isValid }) => {
    this.setState(cur => ({
      [name]: {
        value,
        isValid,
      },
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit && onSubmit(e, this.getFormData());
    // не ресетим, на случай, если форма не долждна закрываться при сабмите
    // this.resetForm();
  };

  render() {
    const { onClose, title, width, autoComplete } = this.props;
    const { handleInputChange, handleSubmit, isFormDataValid } = this;

    return (
      <Form
        width={width}
        onSubmit={handleSubmit}
        autoComplete={autoComplete}
        ref={this.formRef}
        // вычисляемое
        formHeight={this.formHeight}
      >
        <Title>{title}</Title>

        <CloseBtn type="button" title="Close" onClick={onClose}>
          <IconClose size="100%" />
        </CloseBtn>

        {/* Fields */}
        {Object.entries(fieldData).map(([name, data]) => {
          return (
            <TextField
              name={name}
              style={{ borderRadius: 'var(--border-radius)' }}
              value={this.state[name].value}
              onChange={handleInputChange}
              {...data}
            />
          );
        })}

        <SaveBtn type="submit" disabled={!isFormDataValid()}>
          Save
        </SaveBtn>
      </Form>
    );
  }
}
