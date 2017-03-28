import React from 'react';
import IndexLeft from './IndexLeft';
import IndexRight from './IndexRight';
import LoadMore from './LoadMore';

const Index = props => (
  <div>
    <div className="row">
      <LoadMore {...props} />
    </div>
    <div>
      <IndexLeft {...props} />
      <IndexRight {...props} />
    </div>
    <div>&nbsp;</div>
    <div className="col-md-12">
      <LoadMore {...props} />
    </div>
  </div>
);

export default Index;
