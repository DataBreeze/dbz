import React from 'react';
import DetailField from './DetailField';
import ChildPhotos from './ChildPhotos';
import FileUpload from './FileUpload';

class DetailBody extends React.Component {
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
      images = <ChildPhotos photoDeleteConfirm={this.props.photoDeleteConfirm} photosShow={this.props.photosShow} cfg={this.props.cfg} records={photos} />;
    }
    let sourceDetail = '';
    let icon = 'fa fa-user detail';
    const csCfg = this.props.csCfg;
    if (csCfg) {
      sourceDetail = (csCfg.detail || csCfg.title);
      icon = (csCfg.iconClass ? `${csCfg.iconClass} detail` : icon);
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
              <DetailField label="Title:" value={r.title} id="title" />
            </div>
          </div>
          <div className="col-md-5 center">
            <a href="/">
              <i className={icon} />
              <br />
              {sourceDetail}
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

DetailBody.propTypes = {
  record: React.PropTypes.object.isRequired,
  photoDeleteConfirm: React.PropTypes.func.isRequired,
  photosShow: React.PropTypes.func.isRequired,
  permitEdit: React.PropTypes.bool.isRequired,
  csCfg: React.PropTypes.object,
  cfg: React.PropTypes.object.isRequired,
};

DetailBody.defaultProps = {
  csCfg: {},
};
export default DetailBody;
