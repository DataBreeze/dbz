import React from 'react';
import IndexRec from './IndexRec';

const IndexLeft = (props) => {
  const records = [];
  const allRecs = props.records;
  if (allRecs && allRecs.length > 0) {
    const leftSlice = allRecs.slice(0, Math.ceil(allRecs.length / 2));
    leftSlice.map((rec) => {
      records.push(<IndexRec {...props} record={rec} key={rec.id} />);
      return true;
    });
  }
  return (
    <div className="col-sm-6">
      {records}
      <div className="clear" />
    </div>
  );
};

IndexLeft.propTypes = {
  records: React.PropTypes.array.isRequired,
};

export default IndexLeft;
