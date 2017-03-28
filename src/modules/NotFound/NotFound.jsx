// @flow
import React from 'react';
import Helmet from 'react-helmet';

const NotFound = () => (
  <main>
    <Helmet title="Not Found" />
    <h1>Not Found</h1>
  </main>
);

NotFound.displayName = 'NotFound';

export default NotFound;
