import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { accountShow, passwordShow, accountEditInit } from '../../../../actions/userActions';

class Account extends React.Component {
  static initialState() {
    return { dirty: false, username: '', email: '', firstname: '', lastname: '', title: '', phone: '', company: '', website: '', content: '' };
  }
  constructor(props, context) {
    super(props, context);
    if (props.validated && props.user) {
      const u = props.user;
      this.state = { dirty: false, username: u.username, email: u.email, firstname: u.firstname, lastname: u.lastname, title: u.title, phone: u.phone, company: u.company, website: u.website, content: u.content };
    } else {
      this.state = Account.initialState();
    }
    this.inputChange = this.inputChange.bind(this);
    this.passwordShow = this.passwordShow.bind(this);
    this.accountSubmit = this.accountSubmit.bind(this);
    this.accountCancel = this.accountCancel.bind(this);
  }
  componentWillReceiveProps(next) {
    if (next.validated && next.user) {
      const u = next.user;
      this.setState({ dirty: false, username: u.username, email: u.email, firstname: u.firstname, lastname: u.lastname, title: u.title, phone: u.phone, company: u.company, website: u.website, content: u.content });
    } else {
      this.setState(Account.initialState());
    }
  }
  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value, dirty: true });
  }
  passwordShow(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.dispatch(accountShow(false));
    this.props.dispatch(passwordShow(true));
  }
  accountSubmit(e) {
    e.preventDefault();
    const s = this.state;
    if (s.dirty) {
      const p = { email: s.email, firstname: s.firstname, lastname: s.lastname, title: s.title, phone: s.phone, company: s.company, website: s.website, content: s.content };
      this.props.dispatch(accountEditInit(p));
    }
    return false;
  }
  accountCancel(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.dispatch(accountShow(false));
    return false;
  }
  render() {
    return (
      <Modal dialogClassName="fbModal" show={this.props.accountShow} keyboard onHide={this.accountCancel} animation>
        <Modal.Header>
          <Modal.Title>Edit Your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.accountAlert && <div className="login fbAlert">{this.props.accountAlert}</div>}
          <form onSubmit={this.accountSubmit} className="record">
            <div className="panel-body">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input disabled type="text" className="form-control" id="username" aria-describedby="username" value={this.state.username || ''} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" id="email" aria-describedby="title" placeholder="(required)" name="email" value={this.state.email || ''} onChange={this.inputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input type="text" className="form-control" id="firstname" aria-describedby="firstname" placeholder="" name="firstname" value={this.state.firstname || ''} onChange={this.inputChange} autoFocus />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input type="text" className="form-control" id="lastname" aria-describedby="lastname" placeholder="" name="lastname" value={this.state.lastname || ''} onChange={this.inputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" aria-describedby="title" placeholder="" name="title" value={this.state.title || ''} onChange={this.inputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input type="text" className="form-control" id="company" aria-describedby="company" placeholder="" name="company" value={this.state.company || ''} onChange={this.inputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="text" className="form-control" id="phone" aria-describedby="phone" placeholder="" name="phone" value={this.state.phone || ''} onChange={this.inputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input type="text" className="form-control" id="website" aria-describedby="website" placeholder="" name="website" value={this.state.website || ''} onChange={this.inputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="content">Detail</label>
                <textarea className="form-control" id="content" rows="3" name="content" value={this.state.content} onChange={this.inputChange || ''} />
              </div>
              <div className="loginLinks">
                <a href="password" className="loginLink" onClick={this.passwordShow}><i className="fa fa-floppy-o" />Change Password</a>
              </div>
            </div>
            <a key="4" onClick={this.accountSubmit} className="dbzButDark"><i className="fa fa-floppy-o" />Save Changes</a>
            <a key="6" onClick={this.accountCancel} type="button" className="dbzButDark"><i className="fa fa-trash" />Cancel</a>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  accountShow: state.user.accountShow,
  user: state.user.user,
  accountAlert: state.user.accountAlert,
  validated: state.user.validated,
});

Account.propTypes = {
  accountShow: React.PropTypes.bool,
  accountAlert: React.PropTypes.string,
  validated: React.PropTypes.bool,
  user: React.PropTypes.shape({ username: React.PropTypes.string }).isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

Account.defaultProps = {
  accountShow: false,
  accountAlert: null,
  validated: false,
};

export default connect(mapStateToProps)(Account);
