import React from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { initUploadPhoto } from '../../../actions/sourceActions';
import UploadWaitModal from './UploadWaitModal';

class FileUpload extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { showWait: false };
    this.onDrop = this.onDrop.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  onDrop(files) {
    const r = this.props.record || { pid: false };
    this.uploadConfig = { files, source: this.props.params.source, pid: r.id, title: this.props.title, content: this.props.content };
    if (!this.props.autoUpload) {
      // console.log('Manual upload');
    } else {
      this.props.dispatch(initUploadPhoto(this.uploadConfig));
    }
  }
  closeModal() {
    this.setState({ showWait: false });
  }
  openClick() {
    this.dropzone.open();
  }
  render() {
    const multiple = this.props.multiple || false;
    const style = { margin: '20px', padding: '10px', backgroundColor: '#EFEFEF', border: '1px solid steelblue', borderRadius: '5px', textAlign: 'center', cursor: 'pointer' };
    const activeStyle = { margin: '20px', padding: '10px', backgroundColor: '#FFFFCC', border: '2px red' };
    // <button type="button" className="btn btn-sm" onClick={this.onOpenClick}>Upload File</button>
    return (
      <div>
        <Dropzone onDrop={this.onDrop} multiple={multiple} style={style} activeStyle={activeStyle} ref={(node) => { this.dropzone = node; }}>
          <div>
            <div>
              {this.props.message || 'Drop Photos or Click Here to Upload'}
              <i className="fa fa-upload" />
            </div>
            <div data-filetype=".png" className="filepicker-file-icon" />
            <div data-filetype=".gif" className="filepicker-file-icon" />
            <div data-filetype=".jpg" className="filepicker-file-icon" />
          </div>
        </Dropzone>
        <UploadWaitModal showWait={this.props.showWait} />
      </div>
    );
  }
}

FileUpload.propTypes = {
  title: React.PropTypes.string,
  content: React.PropTypes.string,
  record: React.PropTypes.object,
  autoUpload: React.PropTypes.bool,
  message: React.PropTypes.string,
  multiple: React.PropTypes.bool,
  showWait: React.PropTypes.bool,
  params: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

FileUpload.defaultProps = {
  message: 'Drop Photos or Click Here to Upload',
  multiple: false,
  autoUpload: true,
  showWait: false,
  record: {},
  title: null,
  content: null,
};

const mapStateToProps = state => ({
  showWait: state.source.sources.current.showUploadModal,
});

export default connect(mapStateToProps)(FileUpload);
