import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { accountShow, passwordShow, passwordInit } from '../../../../actions/userActions';

class Password extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { password: '', passwordVerify: '' };
    this.inputChange = this.inputChange.bind(this);
    this.passwordSubmit = this.passwordSubmit.bind(this);
    this.passwordCancel = this.passwordCancel.bind(this);
  }
  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value, dirty: true });
  }
  passwordSubmit(e) {
    e.preventDefault();
    const s = this.state;
    const p = { password: s.password, passwordVerify: s.passwordVerify };
    this.props.dispatch(passwordInit(p));
    return false;
  }
  passwordCancel(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.dispatch(passwordShow(false));
    this.props.dispatch(accountShow(true));
    return false;
  }
  render() {
    return (
      <Modal dialogClassName="fbModal" show={this.props.passwordShow} keyboard onHide={this.passwordCancel} animation>
        <Modal.Header>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.passwordAlert && <div className="login fbAlert">{this.props.passwordAlert}</div>}
          <form onSubmit={this.passwordSubmit} className="record">
            <div className="panel-body">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input disabled type="text" className="form-control" id="username" aria-describedby="username" value={this.props.username || ''} />
              </div>
              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input type="password" className="form-control" id="password" aria-describedby="password" placeholder="(required)" name="password" value={this.state.password} onChange={this.inputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="passwordVerify">New Password Verify</label>
                <input type="password" className="form-control" id="passwordVerify" aria-describedby="password Verify" placeholder="(required)" name="passwordVerify" value={this.state.passwordVerify} onChange={this.inputChange} />
              </div>
            </div>
            <a key="1" onClick={this.passwordSubmit} className="dbzButDark"><i className="fa fa-floppy-o" />Change Password</a>
            <a key="2" onClick={this.passwordCancel} type="button" className="dbzButDark"><i className="fa fa-trash" />Cancel</a>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  passwordShow: state.user.passwordShow,
  passwordAlert: state.user.passwordAlert,
  username: (state.user.user ? state.user.user.username : 'Guest'),
});
Password.propTypes = {
  passwordShow: React.PropTypes.bool,
  passwordAlert: React.PropTypes.string,
  username: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};
Password.defaultProps = {
  passwordShow: false,
  passwordAlert: null,
};
export default connect(mapStateToProps)(Password);
