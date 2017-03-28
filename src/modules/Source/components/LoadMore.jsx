import React from 'react';
import { Link } from 'react-router';

export default class LoadMore extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    const p = this.props.stats;
    if (p.count >= p.countAll) {
      e.preventDefault();
    }
  }
  render() {
    const p = this.props.stats || {};
    const offset = p.offset;
    let nextOffset = 1;
    let CancelLink = <div />;
    let url = `/${this.props.params.source}/o/`;
    const urlCancel = url + 0;
    if (offset && (offset !== undefined)) {
      nextOffset = parseInt(offset + 1, 10);
      CancelLink = <Link to={urlCancel} className="link"><i className="fa fa-times" />Reset</Link>;
    }
    url += nextOffset;
    let more = <div />;
    if (p.countAll > p.limit) {
      more = <Link to={url} className="link" onClick={this.handleClick}><i className="fa fa-tasks" />Load More &gt;&gt;</Link>;
    }
    url += nextOffset;
    return (
      <div className="paginate row">
        <div className="col-md-4">
          <span>Showing <b>{p.count}</b> of {p.countAll}</span>
        </div>
        <div className="col-md-4">
          {more}
        </div>
        <div className="col-md-4">
          { CancelLink }
        </div>
      </div>
    );
  }
}

LoadMore.propTypes = {
  stats: React.PropTypes.object,
  params: React.PropTypes.object.isRequired,
};
LoadMore.defaultProps = {
  stats: {},
};
