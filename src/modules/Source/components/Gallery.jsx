import React from 'react';
import ImageGallery from 'react-image-gallery';

class Gallery extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { isMounted: false };
  }
  render() {
    const photos = this.props.records || this.props.photos;
    let gallery = <div />;
    if (photos && photos.length > 0) {
      const src = this.props.cfg.s3.host;
      const images = [];
      photos.forEach((photo) => {
        const title = (photo.title ? photo.title.substr(0, 15) : '');
        const detail = (photo.detail ? photo.detail.substr(0, 100) : '');
        const p = { original: `${src}${photo.id}_large.jpg`, thumbnail: `${src}${photo.id}_thumb2.png`, description: detail, thumbnailLabel: title };
        images.push(p);
      });
      gallery = <ImageGallery items={images} slideInterval={2000} />;
    }
    return (<div>{gallery}</div>);
  }
}

Gallery.propTypes = {
  photos: React.PropTypes.array,
  records: React.PropTypes.array,
  cfg: React.PropTypes.object.isRequired,
};

Gallery.defaultProps = {
  photos: null,
  records: null,
};

export default Gallery;
