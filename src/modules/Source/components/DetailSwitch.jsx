import React from 'react';
import Detail from './Detail';
import DetailBody from './DetailBody';
import DetailBodyUser from './DetailBodyUser';
import DetailBodyPhoto from './DetailBodyPhoto';
import DetailBodySpot from './DetailBodySpot';
import DetailBodyFish from './DetailBodyFish';

const DetailSwitch = (props) => {
  const source = props.params.source;
  if (props.record) {
    if (source === 'photo') {
      return (
        <Detail {...props}>
          <DetailBodyPhoto {...props} />
        </Detail>
      );
    } else if (source === 'user') {
      return (
        <Detail {...props}>
          <DetailBodyUser {...props} />
        </Detail>
      );
    } else if (source === 'spot') {
      return (
        <Detail {...props}>
          <DetailBodySpot {...props} />
        </Detail>
      );
    } else if (source === 'fish') {
      return (
        <Detail {...props}>
          <DetailBodyFish {...props} />
        </Detail>
      );
    }
    return (
      <Detail {...props} >
        <DetailBody {...props} />
      </Detail>
    );
  }
  return null;
};

DetailSwitch.propTypes = {
  record: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
};

DetailSwitch.defaultProps = {
  records: [],
};
export default DetailSwitch;
