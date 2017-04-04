// @flow
import React from 'react';
import { connect } from 'react-redux';
import { initApp } from '../../actions/appActions';
import { restoreUser, passwordResetShow } from '../../actions/userActions';
import { updateSource } from '../../actions/sourceActions';
import HeadBar from './components/HeadBar';
import SideBar from './components/SideBar';
import Auth from './components/Auth';

// class App extends React.Component {
// render() {
const App = (props) => {
  const source = props.params.source;
  return (
    <div className="wrapper">
      <div className="box">
        <div className="row row-offcanvas row-offcanvas-left">
          <SideBar params={props.params} />
          <div className="column col-sm-10" id="main">
            <HeadBar params={props.params} />
            {props.validSource ? props.children : "Source Not Found"}
          </div>
        </div>
      </div>
      <Auth />
    </div>
  );
};

App.displayName = 'App';
App.propTypes = {
  children: React.PropTypes.element.isRequired,
  params: React.PropTypes.object.isRequired,
  validSource: React.PropTypes.bool,
};

App.defaultProps = {
  validSource: false,
};

const mapStateToProps =  (state) => {
  const cs = state.source.sources.current;
  const validSource = ( (cs && cs.cfg) ? true : false);
  return {
    validSource: validSource,
  };
};

App.onEnter = (store, nextState) => {
  const params = nextState.params;
  const source = params.source;
  const dispatch = store.dispatch;
  const p = { source };
  // handle password reset email link
  // show password reset if path and token active
  const token = nextState.params.token;
  if (token) {
    const path = nextState.location.pathname;
    if (path.match(/\/reset\/\w+/)) {
      dispatch(passwordResetShow({ token, show: true }));
    }
  }
  if (source) {
    dispatch(updateSource(p));
  }
  dispatch(initApp({}));
  return dispatch(restoreUser()); // return a promise to the onenter list of promises
};

export default connect(mapStateToProps)(App);
