import React from 'react';
import PropTypes from 'prop-types';
import { VscClose as IconClose } from 'react-icons/vsc';
import { IconWrapper, ClearInputBtn } from './TextField.styled';

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
};

export const ClearBtn = ({ onClick, inputHeight }) => {
  return (
    <ClearInputBtn type="button" onClick={onClick} inputHeight={inputHeight}>
      <IconClose size="100%" />
    </ClearInputBtn>
  );
};

ClearBtn.propTypes = {
  onClick: PropTypes.func,
};
