import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { accountNewShow, accountNewInit, loginShow } from '../../../../actions/userActions';

class AccountNew extends React.Component {
  static initialState() {
    return { dirty: false, username: '', email: '', firstname: '', lastname: '', title: '', phone: '', company: '', website: '', content: '', password: '', passwordVerify: '' };
  }
  constructor(props, context) {
    super(props, context);
    this.state = AccountNew.initialState();
    this.inputChange = this.inputChange.bind(this);
    this.accountNewSubmit = this.accountNewSubmit.bind(this);
    this.accountCancel = this.accountCancel.bind(this);
    this.switchToLogin = this.switchToLogin.bind(this);
  }
  componentWillReceiveProps(next) {
    if ((next.accountNewAlert === null) || (next.accountNewAlert === undefined)) {
      this.setState(AccountNew.initialState());
    }
  }
  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value, dirty: true });
  }
  accountNewSubmit(e) {
    e.preventDefault();
    const s = this.state;
    const p = { username: s.username, email: s.email, password: s.password, passwordVerify: s.passwordVerify, firstname: s.firstname, lastname: s.lastname };
    this.props.dispatch(accountNewInit(p));
    return false;
  }
  accountCancel(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState(AccountNew.initialState());
    this.props.dispatch(accountNewShow(false));
    return false;
  }
  switchToLogin(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.dispatch(accountNewShow(false));
    this.props.dispatch(loginShow(true));
    return false;
  }
  render() {
    return (
      <Modal dialogClassName="fbModal" show={this.props.accountNewShow} keyboard onHide={this.accountCancel} animation>
        <Modal.Header>
          <Modal.Title>Create a new Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { this.props.accountNewAlert && <div className="login fbAlert">{this.props.accountNewAlert}</div>}
          <form onSubmit={this.accountNewSubmit} className="record">
            <div className="panel-body">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="title" aria-describedby="title" placeholder="(required)" name="username" value={this.state.username || ''} onChange={this.inputChange} autoFocus />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" id="email" aria-describedby="title" placeholder="(required)" name="email" value={this.state.email || ''} onChange={this.inputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" aria-describedby="password" placeholder="(required)" name="password" value={this.state.password || ''} onChange={this.inputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="passwordVerify">Password Verify</label>
                <input type="password" className="form-control" id="passwordVerify" aria-describedby="password Verify" placeholder="(required)" name="passwordVerify" value={this.state.passwordVerify || ''} onChange={this.inputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input type="text" className="form-control" id="firstname" aria-describedby="firstname" placeholder="" name="firstname" value={this.state.firstname || ''} onChange={this.inputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input type="text" className="form-control" id="lastname" aria-describedby="lastname" placeholder="" name="lastname" value={this.state.lastname || ''} onChange={this.inputChange} />
              </div>
            </div>
            <div className="loginLinks">
              <a href="login" className="loginLink" onClick={this.switchToLogin}><i className="fa fa-sign-in" />Login To Your Account</a>
            </div>
            <a onClick={this.accountNewSubmit} className="dbzButDark"><i className="fa fa-floppy-o" />Create New Account</a>
            <a onClick={this.accountCancel} className="dbzButDark"><i className="fa fa-trash" />Cancel</a>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  accountNewShow: state.user.accountNewShow,
  accountNewAlert: state.user.accountNewAlert,
});

AccountNew.propTypes = {
  accountNewShow: React.PropTypes.bool,
  accountNewAlert: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired,
};

AccountNew.defaultProps = {
  accountNewShow: false,
  accountNewAlert: null,
};

export default connect(mapStateToProps)(AccountNew);
