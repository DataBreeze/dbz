import React from 'react';
import DetailField from './DetailField';
import ChildPhotos from './ChildPhotos';
import FileUpload from './FileUpload';

class DetailBodyUser extends React.Component {
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
    let name = r.firstname;
    if (r.firstname && r.lastname) {
      name = `${r.firstname} ${r.lastname}`;
    } else if (r.lastname) {
      name = r.lastname;
    }
    return (
      <div className="detail body">
        <div className="row">
          <div className="col-md-7">
            <div className="field group">
              <DetailField label="Username:" value={r.username} id="username" required />
              <DetailField label="Name:" value={name} id="name" />
              <DetailField label="Title:" value={r.title} id="title" />
              <DetailField label="Website:" value={r.website} id="website" />
              <DetailField label="Company:" value={r.company} id="company" />
            </div>
          </div>
          <div className="col-md-5 center">
            <a href="/">
              <i className="fa fa-user detail" />
              <br />
              Select A Profile Photo
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

DetailBodyUser.propTypes = {
  record: React.PropTypes.object.isRequired,
  cfg: React.PropTypes.object.isRequired,
  photoDeleteConfirm: React.PropTypes.func.isRequired,
  photosShow: React.PropTypes.func.isRequired,
  permitEdit: React.PropTypes.bool.isRequired,
};

export default DetailBodyUser;
