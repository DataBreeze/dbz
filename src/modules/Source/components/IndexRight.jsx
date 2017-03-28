import React from 'react';
import IndexRec from './IndexRec';

const IndexRight = (props) => {
  const records = [];
  const allRecs = props.records;
  if (allRecs && (allRecs.length > 0)) {
    const start = Math.ceil(allRecs.length / 2);
    const stop = allRecs.length;
    const rightSlice = allRecs.slice(start, stop);
    rightSlice.map((rec) => {
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

IndexRight.propTypes = {
  records: React.PropTypes.array.isRequired,
};

export default IndexRight;

