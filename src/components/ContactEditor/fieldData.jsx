import { AiOutlineUser as IconUser } from 'react-icons/ai';
import { BiPhone as IconPhone } from 'react-icons/bi';
import { getId } from 'components/utils';

export const fieldData = {
  name: {
    icon: IconUser,
    pattern: /^\s*[a-zа-яіїє]{2,}\s*(\s+[a-zа-яіїє]{2,})?\s*$/iu,
    validationMsg: `First and last name(optional) must contain only letters and 
      be at least 2 characters long`,
    required: true,
    autoFocus: true,
    initialValue: '',
    title: 'Contact name',
    // если в render() генерить key -
    // ввод текста в number перескакивает на name
    key: getId(),
  },

  number: {
    icon: IconPhone,
    pattern: /^\s*\d{3}(-\d{2}){2}\s*$/,
    validationMsg: 'Required number format: XXX-XX-XX',
    required: true,
    initialValue: '',
    title: 'Contact phone number',
    key: getId(),
  },
};

// { fieldName0: {value: string, isValid: bool}, ... fieldNameN: {...} }
export const initialState = Object.entries(fieldData).reduce(
  (res, [name, { required, initialValue }]) => {
    res[name] = { value: initialValue, isValid: !required };
    return res;
  },
  {}
);
