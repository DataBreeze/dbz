// @flow
import React, { PropTypes } from 'react';
import Head from './components/Head';
import PopConfirm from './components/PopConfirm';
import PopPhotos from './components/PopPhotos';
import PopPhotoEdit from './components/PopPhotoEdit';

const Source = props => (
  <div>
    <Head {...props} />
    { props.children }
    <PopConfirm />
    <PopPhotos />
    <PopPhotoEdit />
  </div>
);

Source.displayName = 'Source';

Source.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Source;
