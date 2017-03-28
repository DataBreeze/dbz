// @flow
import React from 'react';
import { connect } from 'react-redux';
import * as Act from '../../../actions/sourceActions';
import DetailSwitch from './DetailSwitch';

class DetailInit extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.clearMsg = this.clearMsg.bind(this);
    this.photosShow = this.photosShow.bind(this);
    this.photoDeleteConfirm = this.photoDeleteConfirm.bind(this);
  }
  componentWillReceiveProps(next) {
    if (next.dirtyOne) {
      // record has changed, force a refetch
      const source = next.params.source;
      const r = next.record;
      const p = { source, id: r.id };
      this.props.dispatch(Act.loadRecord(p));
    }
  }
  shouldComponentUpdate(next) {
    if (next.newUpload) {
      // after a new file has been uploaded
      // cancel render and refetch record
      const source = this.props.params.source;
      const r = next.record;
      const p = { source, id: r.id };
      this.props.dispatch(Act.setNewUpload({ source, newUpload: false }));
      this.props.dispatch(Act.loadRecord(p));
      return false;
    } else if (next.dirtyOne) {
      return false;
    }
    return true;
  }
  photosShow(p) {
    this.props.dispatch(Act.photosShow(p));
  }
  photoDeleteConfirm(p) {
    this.props.dispatch(Act.confirmDeleteRecord(p));
  }
  clearMsg() {
    this.props.dispatch(Act.detailMsgClear());
    return false;
  }
  render() {
    if (this.props.record) {
      return (<DetailSwitch clearMsg={this.clearMsg} photosShow={this.photosShow} photoDeleteConfirm={this.photoDeleteConfirm} {...this.props} />);
    }
    return null;
  }
}

DetailInit.displayName = 'DetailInit';

DetailInit.onEnter = ({ dispatch }, { params }) => dispatch(Act.loadRecord(params));

DetailInit.propTypes = {
  record: React.PropTypes.object,
  params: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

DetailInit.defaultProps = {
  record: null,
  csCfg: {},
};

const mapStateToProps = (state) => {
  const cs = state.source.sources.current;
  const userId = state.user.user.id;
  const recUserId = (cs.record ? cs.record.userId : 'none');
  return {
    dirtyOne: cs.dirtyOne,
    record: cs.record,
    stats: cs.stats,
    csCfg: cs.cfg,
    cfg: state.app.cfg,
    newUpload: cs.newUpload,
    msg: cs.detailMsg,
    msgType: cs.detailMsgType,
    permitEdit: (userId === recUserId),
  };
};

export default connect(mapStateToProps)(DetailInit);
