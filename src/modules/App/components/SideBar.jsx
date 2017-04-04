import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import MenuList from '../../Source/components/MenuList';

class SideBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const menus = [];
    const menusNoLabels = [];
    const sources = MenuList(this.props.sources);
    sources.forEach((source) => {
      if(source.cfg){
	menus.push(<li key={source.source}><Link to={`/${source.source}`}><i className={source.cfg.iconClass} aria-hidden="true" />{source.cfg.titlePlural}</Link></li>);
	menusNoLabels.push(<li key={source.source}><Link to={`/${source.source}`}><i className={source.cfg.iconClass} aria-hidden="true" /></Link></li>);
      }
    });
    return (
      <div className="column col-sm-2 col-xs-1 sidebar-offcanvas" id="sidebar">
        <ul className="nav hidden-xs sidebar" id="lg-menu">
          {menus}
        </ul>
        <ul className="nav visible-xs sidebar-small" id="xs-menu">
          {menusNoLabels}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    sources: state.source.sources,
  }
);

SideBar.propTypes = {
  sources: React.PropTypes.object.isRequired,
};

SideBar = connect(mapStateToProps)(SideBar); // eslint-disable-line no-class-assign

export default SideBar;
