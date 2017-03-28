// @flow
import React from 'react';
import { connect } from 'react-redux';
import * as Act from '../../../actions/sourceActions';
import EditSwitch from './EditSwitch';

class EditInit extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { id: null, source: null };
    this.editSubmit = this.editSubmit.bind(this);
    this.deleteConfirm = this.deleteConfirm.bind(this);
    this.clearMsg = this.clearMsg.bind(this);
    this.deleteId = false;
  }
  shouldComponentUpdate(next) {
    if (!next.record.id) {
      this.context.router.push(`/${this.props.params.source}`);
    }
    if (next.isUpdating) {
      return false;
    }
    return true;
  }
  clearMsg() {
    this.props.dispatch(Act.updateMsgClear());
    return false;
  }
  editSubmit(p) {
    this.props.dispatch(Act.initUpdateRecord(p));
  }
  deleteConfirm(p) {
    this.props.dispatch(Act.confirmDeleteRecord(p));
  }
  render() {
    return (<EditSwitch deleteConfirm={this.deleteConfirm} clearMsg={this.clearMsg} editSubmit={this.editSubmit} {...this.props} />);
  }
}

EditInit.displayName = 'EditInit';

EditInit.onEnter = ({ dispatch }, { params }) => dispatch(Act.loadRecord(params));

const mapStateToProps = (state) => {
  const cs = state.source.sources.current;
  const userId = state.user.user.id;
  const recUserId = (cs.record ? cs.record.userId : 'none');
  return {
    isUpdating: cs.isUpdating,
    record: cs.record,
    stats: cs.stats,
    deleted: cs.deleted,
    msg: cs.updateMsg,
    msgType: cs.updateMsgType,
    cfg: state.app.cfg,
    user: state.user.user,
    permitEdit: (userId === recUserId),
  };
};

/* eslint-disable */
EditInit.propTypes = {
  msg: React.PropTypes.string,
  isUpdating: React.PropTypes.bool,
  record: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};
/* eslint-enable */
EditInit.defaultProps = {
  isUpdating: false,
  msg: null,
};

EditInit.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(EditInit);
