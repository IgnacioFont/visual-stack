import React from 'react';
import PropTypes from 'prop-types';
import './spinner.css';

const Spinner = ({ size, ...propsToPassOn }) => {
  const className = `vs-spinner vs-spinner-${size || 'small'}`;

  return (
    <span className={className} {...propsToPassOn}>
      <i className="fa fa-spinner fa-spin" />
    </span>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'large', 'extra-large', 'button']),
};

export default Spinner;
