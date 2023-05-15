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
    icon: IconUser,
    pattern: /^\s*[a-zа-яіїє]{2,}\s*(\s+[a-zа-яіїє]{2,})?\s*$/iu,
    validationMsg: `First and last name(optional) must contain only letters and 
      be at least 2 characters long`,
    required: true,
  },
  number: {
    icon: IconPhone,
    pattern: /^\s*\d{3}(-\d{2}){2}\s*$/,
    validationMsg: 'Required number format: XXX-XX-XX',
    required: true,
  },
};

const initialState = {
  name: {
    value: '',
    isValid: !field.name.required,
  },
  number: {
    value: '',
    isValid: !field.number.required,
  },
};

//
// Contact editor
//

export class ContactEditor extends Component {
  state = initialState;

  // init
  componentDidMount() {
    this.setFieldValues();
  }

  setFieldValues() {
    const { fieldValues } = this.props;
    if (!Array.isArray(fieldValues)) return;

    Object.keys(this.state).forEach((name, idx) => {
      const value = fieldValues[idx] || '';
      this.setState({ [name]: { value, isValid: true } });
    });
  }

  handleInputChange = (e, { name, value, isValid }) => {
    this.setState(cur => ({
      [name]: {
        value,
        isValid,
      },
    }));
  };

  getFormData() {
    return Object.entries(this.state).reduce((res, [key, data]) => {
      res[key] = data.value.trim();
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
    const { onClose, title, zindex, width } = this.props;
    const { name, number } = this.state;
    const { handleInputChange, handleSubmit } = this;

    return (
      <>
        <Backdrop zindex={zindex} />
        <Form width={width} onSubmit={handleSubmit} zindex={zindex + 1}>
          <Title>{title}</Title>

          <CloseBtn type="button" title="Close" onClick={onClose}>
            <IconClose size="100%" />
          </CloseBtn>

          {/* name */}
          <TextField
            name="name"
            autoComplete="off"
            autoFocus
            required={field.name.required}
            style={{ borderRadius: 'var(--border-radius)' }}
            pattern={field.name.pattern}
            icon={field.name.icon}
            value={name.value}
            onChange={handleInputChange}
            validationMsg={field.name.validationMsg}
          />

          {/* number */}
          <TextField
            name="number"
            autoComplete="off"
            required={field.number.required}
            style={{ borderRadius: 'var(--border-radius)' }}
            pattern={field.number.pattern}
            icon={field.number.icon}
            value={number.value}
            onChange={handleInputChange}
            validationMsg={field.number.validationMsg}
          />

          <SaveBtn type="submit" disabled={!name.isValid || !number.isValid}>
            Save
          </SaveBtn>
        </Form>
      </>
    );
  }
}
