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
  const styles = require('./App.scss');
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={`${styles.row} ${styles['row-offcanvas']} ${styles['row-offcanvas-left']}`}>
          <SideBar params={props.params} />
          <div className="column col-sm-10 Xcol-xs-11" id="main">
            <HeadBar params={props.params} />
            {props.children}
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

export default connect()(App);
