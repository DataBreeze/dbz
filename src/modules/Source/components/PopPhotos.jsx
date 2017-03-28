import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { photosHide } from '../../../actions/sourceActions';
import Gallery from './Gallery';

class PopPhotos extends React.Component {
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
    this.props.dispatch(photosHide());
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
            <Gallery {...this.props} />
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
    show: cs.photosShow,
    photoId: cs.photoId,
    photos: cs.photos,
    cfg: state.app.cfg,
  };
};

PopPhotos.propTypes = {
  title: React.PropTypes.string,
  show: React.PropTypes.bool,
  dispatch: React.PropTypes.func.isRequired,
};

PopPhotos.defaultProps = {
  title: null,
  show: false,
};

export default connect(mapStateToProps)(PopPhotos);
