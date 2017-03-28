import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { loginShow, accountNewShow, accountShow, logoutInit } from '../../../actions/userActions';
import NaviMenu from '../../Source/components/NaviMenu';

class HeadBar extends React.Component {
  constructor(props) {
    super(props);
    this.loginShow = this.loginShow.bind(this);
    this.logout = this.logout.bind(this);
    this.accountNewShow = this.accountNewShow.bind(this);
    this.accountShowClick = this.accountShowClick.bind(this);
  }
  loginShow(e) {
    e.preventDefault();
    this.props.dispatch(loginShow(true));
  }
  logout(e) {
    e.preventDefault();
    this.props.dispatch(logoutInit());
  }
  accountNewShow(e) {
    e.preventDefault();
    this.props.dispatch(accountNewShow(true));
  }
  accountShowClick(e) {
    e.preventDefault();
    this.props.dispatch(accountShow(true));
  }
  render() {
    const cfg = this.props.cfg;
    let loginLabel = 'Login';
    let loginIcon = <i className="fa fa-sign-in" />;
    let login = this.loginShow;
    let accountLabel = 'New Account';
    let accountIcon = <i className="fa fa-user-plus" />;
    let account = this.accountNewShow;
    if (this.props.validated) {
      loginLabel = 'Logout';
      loginIcon = <i className="fa fa-sign-out" />;
      login = this.logout;
      accountLabel = 'Account';
      accountIcon = <i className="fa fa-user" />;
      account = this.accountShowClick;
    }
    return (
      <Navbar className="dbzNavbar" collapseOnSelect fluid inverse color="blue">
        <Navbar.Header>
          <Navbar.Brand>
            <a href={cfg.homeUrl} className="brand">
              <i className={cfg.logoClass} aria-hidden="true" />
            </a>
            <a href={cfg.homeUrl} className=".brand XbrandText2 Xpull-left">{cfg.homeLabel}</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/" onClick={login}>{loginIcon}{loginLabel}</NavItem>
            <NavItem eventKey={2} href="/" onClick={account}>{accountIcon}{accountLabel}</NavItem>
            <NaviMenu sources={this.props.sources} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => (
  {
    validated: state.user.validated,
    cfg: state.app.cfg,
    sources: state.source.sources,
  }
);

HeadBar.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  validated: React.PropTypes.bool.isRequired,
  cfg: React.PropTypes.object.isRequired,
  sources: React.PropTypes.object.isRequired,
};

HeadBar.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

HeadBar = connect(mapStateToProps)(HeadBar); // eslint-disable-line no-class-assign
export default HeadBar;
