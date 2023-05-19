import React from 'react';
import PropTypes from 'prop-types';
import { IconClose } from 'styles/icons';
import { IconWrapper, ClearInputBtn } from './TextField.styled';

//
// Icon
//

export const Icon = React.forwardRef(
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
  color: PropTypes.string,
  // вычисляемое
  iconWidth: PropTypes.number.isRequired,
};

//
// Clear btn
//

export const ClearBtn = ({ onClick, inputHeight }) => {
  return (
    <ClearInputBtn type="button" onClick={onClick} inputHeight={inputHeight}>
      <IconClose size="100%" />
    </ClearInputBtn>
  );
};

ClearBtn.propTypes = {
  onClick: PropTypes.func,
  // вычисляемое
  inputHeight: PropTypes.number.isRequired,
};
