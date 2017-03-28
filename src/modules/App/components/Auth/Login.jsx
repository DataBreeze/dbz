import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { loginShow, loginInit, accountNewShow, resetShow } from '../../../../actions/userActions';

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { username: '', password: '' };
    this.inputChange = this.inputChange.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.loginCancel = this.loginCancel.bind(this);
    this.switchToNewAccount = this.switchToNewAccount.bind(this);
    this.switchToReset = this.switchToReset.bind(this);
  }
  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value, dirty: true });
  }
  loginSubmit(e) {
    e.preventDefault();
    const s = this.state;
    const p = { username: s.username, password: s.password };
    this.props.dispatch(loginInit(p));
    return false;
  }
  loginCancel(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.dispatch(loginShow(false));
    return false;
  }
  switchToNewAccount(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.dispatch(loginShow(false));
    this.props.dispatch(accountNewShow(true));
    return false;
  }
  switchToReset(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.dispatch(loginShow(false));
    this.props.dispatch(resetShow(true));
    return false;
  }
  render() {
    return (
      <Modal dialogClassName="fbModal" show={this.props.loginShow} keyboard onHide={this.loginCancel} animation>
        <Modal.Header>
          <Modal.Title>Login to Your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.loginAlert && <div className="login fbAlert">{this.props.loginAlert}</div>}
          <form onSubmit={this.loginSubmit} className="record">
            <div className="panel-body">
              <div className="form-group">
                <label htmlFor="username">Username or Email</label>
                <input type="text" className="form-control" id="title" placeholder="Username (required)" name="username" value={this.state.username} onChange={this.inputChange} autoFocus />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password (required)" name="password" value={this.state.password} onChange={this.inputChange} />
              </div>
            </div>
            <div className="loginLinks row">
              <div className="col-md-6">
                <a href="login" className="loginLink" onClick={this.switchToNewAccount}><i className="fa fa-plus" />Create a New Account</a>
              </div>
              <div className="col-md-6">
                <a href="reset" className="loginLink" onClick={this.switchToReset}><i className="fa fa-unlock" />Reset Your Account Password</a>
              </div>
            </div>
            <a key="1" onClick={this.loginSubmit} className="dbzButDark"><i className="fa fa-floppy-o" />Login</a>
            <a key="2" onClick={this.loginCancel} type="button" className="dbzButDark"><i className="fa fa-trash" />Cancel</a>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  loginShow: state.user.loginShow,
  loginAlert: state.user.loginAlert,
});

Login.propTypes = {
  loginShow: React.PropTypes.bool,
  loginAlert: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired,
};

Login.defaultProps = {
  loginShow: false,
  loginAlert: '',
};

export default connect(mapStateToProps)(Login);
