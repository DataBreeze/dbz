import React from 'react';

const EditField = ({ label, value, name, id, placeholder, type, rows, inputChange, disabled }) => {
  if (type === 'textarea') {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <textarea className="form-control" id={name} rows={rows || 3} name={name} value={value} placeholder={placeholder} onChange={inputChange} disabled={disabled} />
      </div>
    );
  }
  return (
    <div className="form-group">
      <label htmlFor="{name}">{label}</label>
      <input type="text" className="form-control" id={id} aria-describedby={name} placeholder={placeholder} name={name} value={value} onChange={inputChange} disabled={disabled} />
    </div>
  );
};

EditField.propTypes = {
  type: React.PropTypes.string.isRequired,
  rows: React.PropTypes.string,
  label: React.PropTypes.string,
  value: React.PropTypes.string,
  name: React.PropTypes.string,
  id: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  inputChange: React.PropTypes.func.isRequired,
};
EditField.defaultProps = {
  rows: '3',
  label: '',
  value: '',
  name: '',
  id: '',
  placeholder: '',
  disabled: false,
};
export default EditField;
