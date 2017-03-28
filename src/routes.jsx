// @flow
import React from 'react';
import { IndexRedirect, IndexRoute, Route } from 'react-router';
import { App, Source, MultiInit, DetailInit, EditInit, NewInit, NotFound } from './modules';

// On server we want to fetch all data for the current route before rendering
const fetchData = store => (nextState, replace, callback) => {
Promise.all(
    nextState.routes.map((route) => {
      if (route.component && route.component.onEnter) {
        return route.component.onEnter(store, nextState, route);
      }
      return false;
    }),
  ).then(() => callback());
};

// On client all data for the current route is already in the store’s initial
// state so we only need to attach onEnter hooks for all route components for
// subsequent routes
const attachOnEnterHooks = store => ({ routes: [rootRoute] }) => {
  const attach = (route) => {
    if (route.component && route.component.onEnter) {
      route.onEnter = nextState => route.component.onEnter(store, nextState);
    }
    if (route.indexRoute) {
      attach(route.indexRoute);
    }
    if (route.childRoutes) {
      route.childRoutes.forEach(r => attach(r));
    }
  };
  attach(rootRoute);
};

const configureRoutes = (store) => {
  const onEnter = (__SERVER__ ? fetchData(store) : attachOnEnterHooks(store));
  return (
    <Route path="/" component={App} onEnter={onEnter}>
      <IndexRedirect to="guide" />
      <Route path=":source" component={Source}>
        <IndexRoute component={MultiInit} />
        <Route path="reset/(:token)" component={MultiInit} />
        <Route path="n/" component={NewInit} />
        <Route path="s/(:search)" component={MultiInit} />
        <Route path="o/(:offset)" component={MultiInit} />
        <Route path="e/(:id)" component={EditInit} />
        <Route path=":id" component={DetailInit} />
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  );
};

export default configureRoutes;
