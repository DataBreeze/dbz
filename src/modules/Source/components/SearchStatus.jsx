import React from 'react';
import { Link } from 'react-router';

const SearchStatus = (props) => {
  const search = props.params.search || props.search;
  const url = `/${props.params.source}`;
  return (
    <div className="searchTitle">
      <span>Search: {search}</span>
      <Link to={{ pathname: url, query: { search: 'clear' } }} className="cancel"><i className="fa fa-times red" />Clear</Link>
    </div>
  );
};
SearchStatus.propTypes = {
  params: React.PropTypes.object.isRequired,
  search: React.PropTypes.string,
};

SearchStatus.defaultProps = {
  search: '',
};

export default SearchStatus;
