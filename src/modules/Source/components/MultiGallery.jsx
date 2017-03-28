import React from 'react';
import LoadMore from './LoadMore';
import Gallery from './Gallery';

const MultiGallery = props => (
  <div className="row">
    <div className="row">
      <LoadMore {...props} />
    </div>
    <div className="fbList">
      <Gallery cfg={props.cfg} records={props.records} />
    </div>
    <div className="row">
      <LoadMore {...props} />
    </div>
  </div>
);

MultiGallery.propTypes = {
  records: React.PropTypes.array.isRequired,
  cfg: React.PropTypes.object.isRequired,
};

export default MultiGallery;
