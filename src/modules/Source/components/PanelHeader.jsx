import React from 'react';

const PanelHeader = props => (
  <div className="detail head">
    <div className="pull-left">{props.title}</div>
    <div className="pull-right">{props.buttons}</div>
  </div>
);

PanelHeader.propTypes = {
  title: React.PropTypes.string,
  buttons: React.PropTypes.array,
};

PanelHeader.defaultProps = {
  title: 'Untitled',
  buttons: [],
};

export default PanelHeader;
