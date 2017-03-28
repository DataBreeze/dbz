import React from 'react';
import NewSource from './NewSource';
import NewPhoto from './NewPhoto';
import NewSpot from './NewSpot';

const NewSwitch = (props) => {
  const defaults = { title: '', content: '' };
  const source = props.params.source;
  if (source === 'photo') {
    return (<NewPhoto defaults={defaults} {...props} />);
  } else if (source === 'spot') {
    return (<NewSpot defaults={defaults} {...props} />);
  }
  return (<NewSource {...props} defaults={defaults} />);
};

NewSwitch.propTypes = {
  params: React.PropTypes.object.isRequired,
};
NewSwitch.defaultProps = {

};
export default NewSwitch;
