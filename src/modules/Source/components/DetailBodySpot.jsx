import React from 'react';
import DetailField from './DetailField';
import ChildPhotos from './ChildPhotos';
import FileUpload from './FileUpload';

class DetailBodySpot extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { isMounted: false };
  }
  componentDidMount() {
    this.setState({ isMounted: true });
  }
  render() {
    const r = this.props.record;
    const photos = (r.photos ? (r.photos.records || []) : []);
    let images = null;
    if (photos && photos.length > 0) {
      images = <ChildPhotos photosShow={this.props.photosShow} photoDeleteConfirm={this.props.photoDeleteConfirm} cfg={this.props.cfg} records={photos} />;
    }
    const isBrowser = (typeof window !== 'undefined' && window !== null);
    let uploader = null;
    if (this.props.permitEdit && r && r.id && this.state.isMounted && isBrowser) {
      uploader = <FileUpload multiple={false} autoUpload {...this.props} />;
    }
    return (
      <div className="detail body">
        <div className="row">
          <div className="col-md-7">
            <div className="field group">
              <DetailField label="Spot:" value={r.title} id="title" required />
              <DetailField label="City:" value={r.city} id="city" />
              <DetailField label="State:" value={r.state} id="state" />
            </div>
          </div>
          <div className="col-md-5 center">
            <a href="/">
              <i className="fa fa-map-marker detail" />
              <br />
              Spots
            </a>
          </div>
        </div>
        { r.content && <div className="content">{ r.content }</div>}
        { images }
        { uploader }
      </div>
    );
  }
}
DetailBodySpot.propTypes = {
  record: React.PropTypes.object.isRequired,
  cfg: React.PropTypes.object.isRequired,
  photoDeleteConfirm: React.PropTypes.func.isRequired,
  photosShow: React.PropTypes.func.isRequired,
  permitEdit: React.PropTypes.bool.isRequired,
};

export default DetailBodySpot;
