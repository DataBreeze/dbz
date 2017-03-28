import React from 'react';
import Edit from './Edit';
import Image from './Image';
import EditSpot from './EditSpot';
import EditUser from './EditUser';

const EditSwitch = (props) => {
  const source = props.params.source;
  const r = props.record;
  if (source === 'photo') {
    return (
      <Edit {...props}>
        <Image cfg={props.cfg} source={source} className={'edit auto'} size={'_medium'} record={r} />
      </Edit>
    );
  } else if (source === 'spot') {
    return (
      <EditSpot {...props} />
    );
  } else if (source === 'user') {
    return (
      <EditUser {...props} />
    );
  }
  return (
    <Edit {...props} />
  );
};

EditSwitch.propTypes = {
  params: React.PropTypes.object.isRequired,
  record: React.PropTypes.object.isRequired,
  cfg: React.PropTypes.object,
};
EditSwitch.defaultProps = {
  cfg: {},
};
export default EditSwitch;
