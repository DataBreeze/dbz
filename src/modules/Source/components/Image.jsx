import React from 'react';

const Image = (props) => {
  const r = props.record;
  if (r && r.uploadedToS3) {
    const host = props.cfg.s3.host;
    const src = `${host}${r.id}${props.size}${props.ext}`;
    return <img src={src} className={props.className} alt={props.title || ''} />;
  }
  return null;
};

Image.propTypes = {
  record: React.PropTypes.object.isRequired,
  className: React.PropTypes.string,
  size: React.PropTypes.string,
  ext: React.PropTypes.string,
  title: React.PropTypes.string,
  cfg: React.PropTypes.object.isRequired,
};

Image.defaultProps = {
  className: 'edit auto',
  size: '_medium',
  ext: '.jpg',
  title: null,
};

export default Image;
