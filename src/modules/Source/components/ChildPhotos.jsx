import React from 'react';
import { Image } from 'react-bootstrap';

class ChildPhotos extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { isMounted: false };
    this.photoClick = this.photoClick.bind(this);
    this.editClick = this.editClick.bind(this);
  }
  photoClick(activeId, e) {
    e.preventDefault();
    this.props.photosShow({ photoId: activeId, photos: this.props.records, show: true, title: this.props.title });
  }
  editClick(activeId, e) {
    e.preventDefault();
    this.props.photoDeleteConfirm({ id: activeId, source: 'photo', isChild: true });
  }
  render() {
    const photos = this.props.records;
    if (photos && photos.length > 0) {
      const src = this.props.cfg.s3.host;
      const images = [];
      photos.forEach((photo) => {
        const title = (photo.title ? photo.title.substr(0, 15) : '');
        const detail = (photo.detail ? photo.detail.substr(0, 100) : '');
        const p = { original: `${src}${photo.id}_large.jpg`, thumbnail: `${src}${photo.id}_thumb2.png`, description: detail, thumbnailLabel: title };
        const image = (
          <div key={photo.id} className="dbzThumb">
            <div>
              <a href="/" onClick={e => this.photoClick(photo.id, e)}>
                <Image key={photo.id} href="/" src={p.thumbnail} thumbnail responsive />
              </a>
            </div>
            <div className="dbzThumbBut">
              <a className="photoDelete" onClick={e => this.editClick(photo.id, e)}><i className="fa fa-times red" /></a>
            </div>
          </div>
        );
        images.push(image);
      });
      return (
        <div className="thumbBox">
          {images}
          <div className="clear" />
        </div>
      );
    }
    return null;
  }
}

ChildPhotos.propTypes = {
  records: React.PropTypes.array,
  photosShow: React.PropTypes.func.isRequired,
  photoDeleteConfirm: React.PropTypes.func.isRequired,
  title: React.PropTypes.string,
  cfg: React.PropTypes.object.isRequired,
};

ChildPhotos.defaultProps = {
  records: [],
  title: null,
};

export default ChildPhotos;
