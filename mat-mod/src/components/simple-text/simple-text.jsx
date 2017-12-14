import React from 'react';
import PropTypes from 'prop-types';

export const SimpleText = props => (
  <div>
    <strong>{props.title}</strong> - {props.value}
  </div>
);

SimpleText.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

