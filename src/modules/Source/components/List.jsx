import React from 'react';
import ListRec from './ListRec';
import LoadMore from './LoadMore';

const List = (props) => {
  const rows = [];
  props.records.map((rec) => {
    rows.push(<ListRec {...props} record={rec} key={rec.id} />);
    return true;
  });
  return (
    <div className="row">
      <div className="row">
        <LoadMore {...props} />
      </div>
      <div className="fbList">
        <table className="table table-striped table-bordered table-hover table-responsive fbTable">
          <thead>
            <tr>
              <th>&nbsp;</th><th>Date</th><th>User</th><th>title</th><th>Content</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
      <div className="row">
        <LoadMore {...props} />
      </div>
    </div>
  );
};

List.propTypes = {
  records: React.PropTypes.array,
};
List.defaultProps = {
  records: {},
};
export default List;
