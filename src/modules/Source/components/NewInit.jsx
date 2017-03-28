// @flow
import React from 'react';
import { connect } from 'react-redux';
import * as Act from '../../../actions/sourceActions';
import NewSwitch from './NewSwitch';

class NewInit extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.newSubmit = this.newSubmit.bind(this);
    this.clearError = this.clearError.bind(this);
  }
  componentWillReceiveProps(next) {
    if (next.newId) {
      this.props.dispatch(Act.updateMsgSet({ msg: 'New Record has been Saved.', type: 'success' }));
      const url = `/${this.props.params.source}/e/${encodeURIComponent(next.newId)}`;
      this.context.router.push(url);
    }
  }
  newSubmit(p) {
    this.props.dispatch(Act.initNewRecord(p));
    return false;
  }
  clearError() {
    this.props.dispatch(Act.newErrorClear());
    return false;
  }
  render() {
    return (<NewSwitch newSubmit={this.newSubmit} clearError={this.clearError} {...this.props} />);
  }
}

NewInit.displayName = 'NewInit';

const mapStateToProps = state => (
  { newId: Act.getNewId(state),
    username: state.user.user.username,
    validated: state.user.validated,
    error: state.source.sources.current.errorNew,
    errorMsg: state.source.sources.current.errorNewMsg,
    csCfg: state.source.sources.current.cfg,
  }
);

NewInit.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
};

NewInit.defaultProps = {
  username: 'Guest',
  error: false,
  errorMsg: null,
};

NewInit.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(NewInit);
