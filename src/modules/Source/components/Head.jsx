import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Head extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: props.params.search || '' };
    this.searchSubmit = this.searchSubmit.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.searchClear = this.searchClear.bind(this);
  }
  searchChange(e) {
    this.setState({ search: e.target.value });
  }
  searchSubmit(e) {
    e.preventDefault();
    const searchText = this.state.search.trim();
    if (searchText) {
      const url = `/${this.props.params.source}/s/${encodeURIComponent(searchText)}`;
      this.context.router.push(url);
    }
    return false;
  }
  searchClear(e) {
    e.preventDefault();
    this.setState({ search: '' });
    const url = `/${this.props.params.source}?search=clear`;
    this.context.router.push(url);
    return false;
  }
  render() {
    const cs = this.props.cs;
    const title = cs.cfg.titlePlural;
    const iconClass = cs.cfg.iconClass;
    const source = this.props.params.source;
    const url = `/${source}`;
    const urlFirst = `${url}/first`;
    const urlNew = `${url}/n/`;
    let searchCancel = <div />;
    let search = (this.props.params.search || this.props.search);
    if (this.props.location.query.search && (this.props.location.query.search === 'clear')) { // eslint-disable-line react/prop-types
      search = false;
    }
    if (search) {
      searchCancel = <button className="btn btn-default red" type="button" onClick={this.searchClear}><i className="fa fa-times" /></button>;
    }
    const showNewBut = (cs.cfg.view && (cs.cfg.view['new'] === false)); // eslint-disable-line dot-notation
    const buts = [];
    if (source === 'photo') {
      buts.push(<Link key="9" className="btn btn-primary btn-sm" to={{ pathname: url, query: { listview: 'gallery' } }} ><i className="fa fa-picture-o" />Gallery</Link>);
    }
    buts.push(<Link key="1" className="btn btn-primary btn-sm" to={{ pathname: url, query: { listview: 'icon' } }}><i className="fa fa-th-large" />Index</Link>);
    buts.push(<Link key="2" className="btn btn-primary btn-sm" to={{ pathname: url, query: { listview: 'list' } }} ><i className="fa fa-list" />List</Link>);
    buts.push(<Link key="3" className="btn btn-primary btn-sm" to={{ pathname: urlFirst }}><i className="fa fa-info" />Detail</Link>);
    if (showNewBut) {
      buts.push(<Link key="4" className="btn btn-primary btn-sm" to={urlNew}><i className="fa fa-plus" />New</Link>);
    }
    return (
      <div className="bodyHead source head">
        <div className="title row head">
          <div className="tbox col-md-3 box1"><i className={iconClass} />{title}</div>
          <div className="tbox col-md-6 box2 btn-group" role="group" aria-label="...">
            {buts}
          </div>
          <div className="tbox col-md-3 box3">
            <form onSubmit={this.searchSubmit}>
              <div className="input-group input-group-sm">
                <input type="text" className="form-control" placeholder="Search" name="srch-term" id="srch-term" value={this.state.search} onChange={this.searchChange} />
                <div className="input-group-btn">
                  <button className="btn btn-default" type="submit" ><i className="fa fa-search" /></button>
                  {searchCancel}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Head.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
Head.propTypes = {
  cs: React.PropTypes.object,
  params: React.PropTypes.object.isRequired,
  search: React.PropTypes.string,
};

Head.defaultProps = {
  cs: {},
  search: null,
};

const mapStateToProps = state => ({
  cs: state.source.sources.current,
});

Head = connect(mapStateToProps)(Head); // eslint-disable-line no-class-assign
export default Head;
