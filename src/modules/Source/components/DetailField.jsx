import React from 'react';

const DetailField = (props) => {
  if (!props.value && !props.required) {
    return null;
  }
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <span>{props.value}</span>
    </div>
  );
};

DetailField.propTypes = {
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  value: React.PropTypes.string,
  required: React.PropTypes.bool,
};

DetailField.defaultProps = {
  id: '',
  label: '',
  value: '',
  required: false,
};

export default DetailField;
