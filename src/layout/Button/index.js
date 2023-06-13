import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Button = ({ text="", icon=false, variant="primary", onClick = ()=>{} , ...props}) => {
  return (
    <button className={[`button-${variant}`, props.className].join(' ') } onClick={onClick}>
      {icon && <img src={icon} alt="" />}
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  variant: 'primary',
};

export default Button;
