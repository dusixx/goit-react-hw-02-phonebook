import { Component } from 'react';
import { Backdrop } from 'styles/shared';
import { TextField } from 'components/TextField/TextField';
import { AiOutlineUser as IconUser } from 'react-icons/ai';
import { BiPhone as IconPhone } from 'react-icons/bi';
import { VscClose as IconClose } from 'react-icons/vsc';
import { Form, CloseBtn, Title, SaveBtn } from './ContactEditor.styled';

//
// Params
//

const field = {
  name: {
    pattern: /^[a-zа-яіїє]{2,}(\s+[a-zа-яіїє]{2,})?$/iu,
    validationMsg:
      'First and last name(optional) must contain only letters and be at least 2 characters long',
    required: true,
  },
  number: {
    pattern: /^\d{3}(-\d{2}){2}$/,
    validationMsg: 'Required number format: XXX-XX-XX',
    required: true,
  },
};

const initialState = {
  name: {
    value: '',
    isValid: !field.name.required,
    validationMsg: '',
  },
  number: {
    value: '',
    isValid: !field.number.required,
    validationMsg: '',
  },
};

//
// Contact editor
//

export class ContactEditor extends Component {
  state = initialState;

  // componentWillMount() {
  //   const { data } = this.props;
  // }

  getValidationInfo(e) {
    const { name } = e.target;
    const { isValid } = this.state[name];
    return { name, validationMsg: !isValid && field[name].validationMsg };
  }

  handleInputChange = (e, { name, pattern, required }) => {
    // e === null при клике на clearBtn
    const value = e?.target?.value || '';
    // если поле необязательное, но значение введено -
    // проверяем его валидность
    const isValid = value ? pattern.test(value) : !required;

    this.setState(cur => ({
      [name]: {
        ...cur[name],
        value,
        isValid,
      },
    }));
  };

  handleInputBlur = e => {
    const { name, validationMsg } = this.getValidationInfo(e);
    this.setState(cur => ({
      [name]: { ...cur[name], validationMsg },
    }));
  };

  getFormData() {
    console.log(this.state, Object.entries(this.state));

    return Object.entries(this.state).reduce((res, [key, data]) => {
      res[key] = data.value;
      return res;
    }, {});
  }

  handleSubmit = e => {
    e.preventDefault();
    // submit
    const { onSubmit } = this.props;
    onSubmit && onSubmit(e, this.getFormData());
    // reset
    this.setState(initialState);
  };

  render() {
    const { onClose, title } = this.props;
    const { name, number } = this.state;
    const { handleInputChange, handleSubmit, handleInputBlur } = this;

    return (
      <Form width="500px" onSubmit={handleSubmit}>
        <Title>{title}</Title>

        <CloseBtn type="button" title="Close" onClick={onClose}>
          <IconClose size="100%" />
        </CloseBtn>

        {/* name */}
        <TextField
          name="name"
          autoComplete="off"
          required={field.name.required}
          style={{ borderRadius: 'var(--border-radius)' }}
          pattern={field.name.pattern}
          icon={IconUser}
          value={name.value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          validationMsg={name.validationMsg}
        />

        {/* number */}
        <TextField
          name="number"
          autoComplete="off"
          required={field.number.required}
          style={{ borderRadius: 'var(--border-radius)' }}
          pattern={field.number.pattern}
          icon={IconPhone}
          value={number.value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          validationMsg={number.validationMsg}
        />

        <SaveBtn type="submit" disabled={!name.isValid || !number.isValid}>
          Save
        </SaveBtn>
      </Form>
    );
  }
}
