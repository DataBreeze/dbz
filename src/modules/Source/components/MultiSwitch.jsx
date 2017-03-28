import React from 'react';
import Index from './Index';
import List from './List';
import MultiGallery from './MultiGallery';

const MultiSwitch = (props) => {
  const source = props.params.source;
  if ((!props.isFetching) && props.records) {
    const listView = props.location.query.listview || props.listView;
    if (listView && (listView === 'list')) {
      return (<List {...props} />);
    } else if ((source === 'photo') && (listView === 'gallery')) {
      return (<MultiGallery {...props} />);
    }
    return (<Index {...props} />);
  }
  return (<span />);
};

MultiSwitch.propTypes = {
  records: React.PropTypes.array,
  location: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  isFetching: React.PropTypes.bool,
  listView: React.PropTypes.string,
};
MultiSwitch.defaultProps = {
  records: [],
  isFetching: false,
  listView: 'index',
};

export default MultiSwitch;
