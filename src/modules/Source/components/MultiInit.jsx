// @flow
import React from 'react';
import { connect } from 'react-redux';
import * as Act from '../../../actions/sourceActions';
import MultiSwitch from './MultiSwitch';

class MultiInit extends React.Component {
  componentWillReceiveProps(next) {
    const dispatch = this.props.dispatch;
    const source = next.params.source || 'spot';
    const listView = next.location.query.listview || false;
    const p = { source };
    // PROCESS NON-FETCH PARAMETERS INTO STATE
    if (listView && (listView !== next.listView)) {
      p.listView = listView;
      p.needsRender = true;
      dispatch(Act.updateListView(p));
    }
    if (next.location.query.search === 'clear') {
      // clear search from state
      p.search = null;
      dispatch(Act.updateSearch(p));
      dispatch(Act.loadRecords(p));
    }
    if ((next.dirtyList === true) && (!next.isFetching)) {
      dispatch(Act.loadRecords(p));
    }
  }
  shouldComponentUpdate(next) {
    let shouldUpdate = false;
    if (next.isFetching) {
      shouldUpdate = false;
    } else if (next.newData) {
      shouldUpdate = true;
    } else if (next.needsRender) {
      shouldUpdate = true;
    } else {
      shouldUpdate = false;
    }
    return shouldUpdate;
  }
  componentDidUpdate() {
    this.props.dispatch(Act.componentUpdated({ source: this.props.params.source }));
  }
  getCurrentState() {
    return this.props.dispatch(Act.getCurrentState());
  }
  render() {
    return (<MultiSwitch {...this.props} />);
  }
}
MultiInit.contextTypes = {
  redux: React.PropTypes.object,
};

MultiInit.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
};

MultiInit.onEnter = (store, nextState) => {
  // only way to fetch new data is route change
  const source = nextState.params.source || 'spot';
  const p = { source };
  const dispatch = store.dispatch;
  if (source) {
    p.source = source;
    dispatch(Act.updateSource(p));
  }
  if (nextState.params.search) {
    // save search to state
    p.search = nextState.params.search;
    dispatch(Act.updateSearch(p));
  } else if (nextState.location.query.search === 'clear') {
    // clear search from state
    p.search = null;
    dispatch(Act.updateSearch(p));
  }
  if (nextState.location.query.listview) {
    p.listView = nextState.location.query.listview;
    p.needsRender = false;
    dispatch(Act.updateListView(p));
  }
  if (nextState.params.offset) {
    p.offset = nextState.params.offset;
    dispatch(Act.updateOffset(p));
  }
  return dispatch(Act.loadRecords(p));
};

const mapStateToProps = (state) => {
  const cs = state.source.sources.current;
  return {
    records: Act.getRecords(state),
    stats: Act.getStats(state),
    isFetching: cs.isFetching,
    listView: cs.listView,
    dirtyList: cs.dirtyList,
    needsRender: cs.needsRender,
    csCfg: cs.cfg,
    cfg: state.app.cfg,
  };
};

export default connect(mapStateToProps)(MultiInit);
