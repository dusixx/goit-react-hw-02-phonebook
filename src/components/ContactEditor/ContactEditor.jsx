import { Component } from 'react';
import { Backdrop } from 'styles/shared';
import { TextField } from 'components/TextField/TextField';
import { VscClose as IconClose } from 'react-icons/vsc';
import { Form, CloseBtn, Title, SaveBtn } from './ContactEditor.styled';
import { fieldData, initialState } from './fieldData';

//
// Contact editor
//

export class ContactEditor extends Component {
  // { fieldName0: {value: string, isValid: bool}, ... }
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

  getFormData() {
    return Object.entries(this.state).reduce((res, [key, data]) => {
      res[key] = data.value.trim();
      return res;
    }, {});
  }

  resetForm() {
    this.setState(initialState);
  }

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
    this.resetForm();
  };

  render() {
    const { onClose, title, zindex, width, backdrop } = this.props;
    const { handleInputChange, handleSubmit, isFormDataValid } = this;

    return (
      <>
        <Backdrop zindex={zindex} />
        <Form
          width={width}
          onSubmit={handleSubmit}
          zindex={zindex + 1}
          autoComplete="off"
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
      </>
    );
  }
}
