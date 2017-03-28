import React from 'react';

const RecInfo = (props) => {
  const r = props.record;
  return (
    <div className="userInfo">
      <i className="fa fa-user" /><a name="user" href={`/user/${r.userId}`}>{ r.username }</a>
      &nbsp;
      <i className="fa fa-calendar" /><span>{r.dateCreate}</span>
    </div>
  );
};

RecInfo.propTypes = {
  record: React.PropTypes.object,
};

RecInfo.defaultProps = {
  record: {},
};

export default RecInfo;
