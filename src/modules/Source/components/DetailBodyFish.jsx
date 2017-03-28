import React from 'react';
import DetailField from './DetailField';
import ChildPhotos from './ChildPhotos';
import FileUpload from './FileUpload';

class DetailBodyFish extends React.Component {
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
    let content = null;
    if (r.content) {
      content = <div className="content" dangerouslySetInnerHTML={{ __html: r.content }} />; // eslint-disable-line react/no-danger
    }
    return (
      <div className="detail body">
        <div className="row">
          <div className="col-md-12">
            <div className="field group">
              <DetailField label="Name:" value={r.name} id="name" required />
              <DetailField label="Scientific Name:" value={r.name_sci} id="name_sci" />
              <DetailField label="Alias:" value={r.alias} id="alias" />
              <DetailField label="Average Weight:" value={r.avg_weight} id="avg_weight" />
              <DetailField label="Average Length:" value={r.avg_length} id="avg_length" />
            </div>
          </div>
        </div>
        { content }
        { images }
        { uploader }
      </div>
    );
  }
}
DetailBodyFish.propTypes = {
  record: React.PropTypes.object.isRequired,
  photoDeleteConfirm: React.PropTypes.func.isRequired,
  photosShow: React.PropTypes.func.isRequired,
  permitEdit: React.PropTypes.bool.isRequired,
  cfg: React.PropTypes.object.isRequired,
};

export default DetailBodyFish;
