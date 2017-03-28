import React from 'react';
import { Alert } from 'react-bootstrap';

const DataAlert = props => (
  <Alert bsStyle={props.style || 'warning'}>
    {props.alertText}
  </Alert>
);

DataAlert.propTypes = {
  alertText: React.PropTypes.string,
  style: React.PropTypes.string,
};

DataAlert.defaultProps = {
  alertText: '',
  style: 'warning',
};

export default DataAlert;
