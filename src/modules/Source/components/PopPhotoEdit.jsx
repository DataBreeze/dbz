import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { photoEditHide } from '../../../actions/sourceActions';

// unfinished popup photo edit

class PopPhotoEdit extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.photoClick = this.photoClick.bind(this);
    this.close = this.close.bind(this);
  }
  photoClick(e) {
    if (e) {
      e.preventDefault();
    }
    return this;
  }
  close(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.dispatch(photoEditHide());
    return false;
  }
  render() {
    let title = this.props.title;
    title = `Photos for ${this.props.title}`;
    return (
      <Modal dialogClassName="fbModal" bsSize="large" show={this.props.show} keyboard onHide={this.close} animation>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="panel-body">
            <h1>EDIT PHOTO</h1>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <a onClick={this.close} className="dbzButDark"><i className="fa fa-times" />Close</a>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const cs = state.source.sources.current;
  const title = (cs.cfg ? cs.cfg.title : null);
  return {
    title,
    show: cs.photoEditShow,
    photoId: cs.photoId,
    cfg: state.app.cfg,
  };
};

/* eslint-disable */
PopPhotoEdit.propTypes = {
  title: React.PropTypes.string,
  show: React.PropTypes.bool,
  photos: React.PropTypes.array,
  photoId: React.PropTypes.string,
  cfg: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};
/* eslint-enable */
PopPhotoEdit.defaultProps = {
  title: null,
  show: false,
  photos: [],
  photoId: null,
};

export default connect(mapStateToProps)(PopPhotoEdit);
