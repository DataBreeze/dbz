import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { passwordResetShow, passwordResetInit, resetShow } from '../../../../actions/userActions';

class PasswordReset extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { password: '', passwordVerify: '' };
    this.inputChange = this.inputChange.bind(this);
    this.switchToReset = this.switchToReset.bind(this);
    this.passwordResetSubmit = this.passwordResetSubmit.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value, dirty: true });
  }
  passwordResetSubmit(e) {
    e.preventDefault();
    const s = this.state;
    const p = { password: s.password, passwordVerify: s.passwordVerify };
    this.props.dispatch(passwordResetInit(p));
    return false;
  }
  switchToReset(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.dispatch(passwordResetShow({ show: false }));
    this.props.dispatch(resetShow(true));
    return false;
  }
  cancel(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.dispatch(passwordResetShow({ show: false }));
    return false;
  }
  render() {
    return (
      <Modal dialogClassName="fbModal" show={this.props.passwordResetShow} keyboard onHide={this.cancel} animation>
        <Modal.Header>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.passwordResetAlert && <div className="login fbAlert">{this.props.passwordResetAlert}</div>}
          <form onSubmit={this.passwordResetSubmit} className="record">
            <div className="panel-body">
              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input type="password" className="form-control" id="password" aria-describedby="password" placeholder="(required)" name="password" value={this.state.password} onChange={this.inputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="passwordVerify">New Password Verify</label>
                <input type="password" className="form-control" id="passwordVerify" aria-describedby="password Verify" placeholder="(required)" name="passwordVerify" value={this.state.passwordVerify} onChange={this.inputChange} />
              </div>
              <div>
                <a href="reset" className="loginLink" onClick={this.switchToReset}><i className="fa fa-unlock" />Reset Your Account Password</a>
              </div>
            </div>
            <a key="1" onClick={this.passwordResetSubmit} className="dbzButDark"><i className="fa fa-floppy-o" />Reset Password</a>
            <a key="2" onClick={this.cancel} className="dbzButDark"><i className="fa fa-trash" />Cancel</a>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  passwordResetShow: state.user.passwordResetShow,
  passwordResetAlert: state.user.passwordResetAlert,
});

PasswordReset.propTypes = {
  passwordResetShow: React.PropTypes.bool,
  passwordResetAlert: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired,
};

PasswordReset.defaultProps = {
  passwordResetShow: false,
  passwordResetAlert: null,
};

export default connect(mapStateToProps)(PasswordReset);
