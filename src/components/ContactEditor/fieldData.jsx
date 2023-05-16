import { IconUser, IconPhone } from 'styles/icons';
import { getId } from 'components/utils';

export const fieldData = {
  name: {
    icon: IconUser,
    pattern: /^\s*[a-zа-яіїє]{2,}\s*(\s+[a-zа-яіїє]{2,})?\s*$/iu,
    validationMsg: `First and last name(optional) must contain only letters and 
      be at least 2 characters long`,
    required: true,
    // на модалке с бекдропом не работает
    autoFocus: true,
    initialValue: '',
    title: 'Contact name',
    // если в render() генерить key -
    // ввод текста в поле number перескакивает на поле name
    key: getId(),
  },

  number: {
    type: 'tel',
    icon: IconPhone,
    pattern: /^\s*\d{3}(-\d{2}){2}\s*$/,
    validationMsg: 'Required number format: XXX-XX-XX',
    required: true,
    initialValue: '',
    title: 'Contact phone number',
    key: getId(),
  },
};

// {
//    fieldName0: { value: [string], isValid: [bool] },
//    fieldName1: {...}, ...
// };
export const initialState = Object.entries(fieldData).reduce(
  (res, [name, { required, initialValue }]) => {
    res[name] = { value: initialValue, isValid: !required };
    return res;
  },
  {}
);
