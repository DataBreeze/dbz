import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { loginShow, resetInit, resetShow } from '../../../../actions/userActions';

class Reset extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { username: '' };
    this.inputChange = this.inputChange.bind(this);
    this.resetSubmit = this.resetSubmit.bind(this);
    this.resetCancel = this.resetCancel.bind(this);
    this.switchToLogin = this.switchToLogin.bind(this);
  }
  componentWillReceiveProps() {
    this.setState({ username: '' });
  }
  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  resetSubmit(e) {
    e.preventDefault();
    const p = { username: this.state.username };
    this.props.dispatch(resetInit(p));
    return false;
  }
  resetCancel(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.dispatch(resetShow(false));
    return false;
  }
  switchToLogin(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.dispatch(resetShow(false));
    this.props.dispatch(loginShow(true));
    return false;
  }
  render() {
    return (
      <Modal dialogClassName="fbModal" show={this.props.resetShow} keyboard onHide={this.resetCancel} animation>
        <Modal.Header>
          <Modal.Title>Reset Your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.resetAlert && <div className="login fbAlert">{this.props.resetAlert}</div>}
          <form onSubmit={this.resetSubmit} className="record">
            <div className="panel-body">
              <div className="form-group">
                <label htmlFor="username">Username or Email</label>
                <input type="text" className="form-control" id="title" aria-describedby="title" placeholder="Username or Email(required)" name="username" value={this.state.username} onChange={this.inputChange} />
              </div>
            </div>
            <div className="loginLinks">
              <a href="login" className="loginLink" onClick={this.switchToLogin}><i className="fa fa-sign-in" />Login To Your Account</a>
            </div>
            <a onClick={this.resetSubmit} className="dbzButDark"><i className="fa fa-floppy-o" />Reset Login</a>
            <a onClick={this.resetCancel} className="dbzButDark"><i className="fa fa-trash" />Cancel</a>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  resetShow: state.user.resetShow,
  resetAlert: state.user.resetAlert,
});

Reset.propTypes = {
  resetShow: React.PropTypes.bool,
  resetAlert: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired,
};

Reset.defaultProps = {
  resetShow: false,
  resetAlert: null,
};

export default connect(mapStateToProps)(Reset);
