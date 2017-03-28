import React from 'react';
import { Modal } from 'react-bootstrap';

const UploadWaitModal = props => (
  <Modal dialogClassName="fbModal" show={props.showWait} keyboard={false} animation>
    <Modal.Header>
      <Modal.Title>Photo is now Uploading</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="imageLoading"><p>Please wait while the image loads...</p><div><i className="fa fa-refresh fa-spin fa-3x fa-fw" /></div></div>
    </Modal.Body>
  </Modal>
);

UploadWaitModal.propTypes = {
  showWait: React.PropTypes.bool,
};

UploadWaitModal.defaultProps = {
  showWait: false,
};
export default UploadWaitModal;
