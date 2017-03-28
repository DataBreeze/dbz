import React from 'react';
import { connect } from 'react-redux';
import { Modal, Alert } from 'react-bootstrap';

import { confirmDeleteYes, confirmDeleteNo } from '../../../actions/sourceActions';

class Confirm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.confirmNo = this.confirmNo.bind(this);
    this.confirmYes = this.confirmYes.bind(this);
  }
  confirmYes(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.dispatch(confirmDeleteYes());
    return false;
  }
  confirmNo(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.dispatch(confirmDeleteNo());
    return false;
  }
  render() {
    return (
      <Modal dialogClassName="fbModal" show={this.props.confirmShow} keyboard onHide={this.confirmNo} animation>
        <Modal.Header>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="panel-body">
            <Alert bsStyle="danger">{this.props.confirmMsg}</Alert>
            <a onClick={this.confirmYes} className="dbzButDark"><i className="fa fa-times" />Yes - Delete</a>
            <a onClick={this.confirmNo} className="dbzButDark"><i className="fa fa-times" />Cancel</a>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  confirmShow: state.source.sources.current.confirmShow,
  confirmMsg: state.source.sources.current.confirmMsg,
});

Confirm.propTypes = {
  confirmShow: React.PropTypes.bool,
  confirmMsg: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired,
};

Confirm.defaultProps = {
  confirmShow: false,
  confirmMsg: null,
};

export default connect(mapStateToProps)(Confirm);
