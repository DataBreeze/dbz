import React from 'react';
import { MenuItem, NavDropdown } from 'react-bootstrap';
import MenuList from './MenuList';

class NaviMenu extends React.Component {
  constructor(props) {
    super(props);
    this.goToSource = this.goToSource.bind(this);
  }
  goToSource(e) {
    e.preventDefault();
    const source = e.target.getAttribute('name');
    if (!source) {
      return false;
    }
    const url = `/${source}`;
    this.context.router.push(url);
    return false;
  }
  render() {
    const menus = [];
    const sources = MenuList(this.props.sources);
    sources.forEach((source) => {
      menus.push(
        <MenuItem name={source.source} key={source.source} onClick={this.goToSource} eventKey={source.cfg.menu.order}>
          <i name={source.source} className={source.cfg.iconClass} aria-hidden="true" />{source.cfg.titlePlural}
        </MenuItem>,
      );
      return true;
    });
    return (
      <NavDropdown eventKey={3.5} title={<span><i className="fa fa-bars" />Menu</span>} id="basic-nav-dropdown">
        {menus}
      </NavDropdown>
    );
  }
}

NaviMenu.propTypes = {
  sources: React.PropTypes.object.isRequired,
};
NaviMenu.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default NaviMenu;
