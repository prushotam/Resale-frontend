import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LinkButton = ({ text, icon, to, onClick }) => {
  const handleClick = (event) => {
    event.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  const renderLink = () => {
    if (to) {
      return (
        <Link to={to} className={`link-btn`}>
          {icon && <img src={icon} alt="" />}
          {text}
        </Link>
      );
    } else {
      return (
        <a href="#" className={`link-btn`} onClick={handleClick}>
          {icon && <img src={icon} alt="" />}
          {text}
        </a>
      );
    }
  };

  return renderLink();
};

LinkButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
};

LinkButton.defaultProps = {
}
