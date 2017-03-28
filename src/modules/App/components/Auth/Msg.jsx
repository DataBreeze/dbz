import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { msgShow } from '../../../../actions/userActions';

class Msg extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.msgClose = this.msgClose.bind(this);
  }
  msgClose(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.dispatch(msgShow({ msgShow: false }));
    return false;
  }
  render() {
    return (
      <Modal dialogClassName="fbModal" show={this.props.msgShow} keyboard onHide={this.msgClose} animation>
        <Modal.Header>
          <Modal.Title>Website Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="panel-body">
            <div className="login fbMsg">{this.props.msg}</div>
            <a onClick={this.msgClose} className="dbzButDark"><i className="fa fa-times" />Close</a>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  msgShow: state.user.msgShow,
  msg: state.user.msg,
});

Msg.propTypes = {
  msgShow: React.PropTypes.bool,
  msg: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired,
};

Msg.defaultProps = {
  msgShow: false,
  msg: null,
};

export default connect(mapStateToProps)(Msg);
