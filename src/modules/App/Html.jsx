// @flow
import React, { PropTypes } from 'react';

// `getStyles` is to prevent FOUC in development
const getStyles = assets =>
Object.keys(assets)
      .map(key => assets[key])
      .reduce((acc, { _style }) => {
        if (_style) {
          acc += _style; // eslint-disable-line no-param-reassign
        }
        return acc;
      }, '');

const getInitialState = (state) => {
  const token = state.user.token;
  state.user.token = false; // eslint-disable-line no-param-reassign
  const json = JSON.stringify(state).replace('</', '<\\/');
  state.user.token = token; // eslint-disable-line no-param-reassign
  return `window.__INITIAL_STATE__=${json}`;
};

const Html = (props) => {
  const { markup, state, assets: { styles, javascript, assets }, helmet } = props;
  return (
    <html lang="en-US">
      <head>
        <meta charSet="UTF-8" />
        {helmet && helmet.title.toComponent()}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="http://localhost/css/lib/bootstrap.css" />
        <link rel="stylesheet" href="http://localhost/css/lib/font-awesome.css" />
        <link rel="stylesheet" href="http://localhost/css/lib/vesper-icons.css" />
        <link rel="stylesheet" href="http://localhost/css/lib/image-gallery.css" />
        <link rel="stylesheet" href="http://localhost/css/dbz.css" />
        {Object.keys(styles).map(key => (
          <link key={key} rel="stylesheet" href={styles[key]} />
         ))}
        { __DEV__ && <style dangerouslySetInnerHTML={{ __html: getStyles(assets) }} /> }
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: markup }} />
        <script dangerouslySetInnerHTML={{ __html: getInitialState(state) }} />
        <script src={javascript.app} />
      </body>
    </html>
  );
};

Html.displayName = 'Html';

Html.propTypes = {
  markup: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  assets: PropTypes.shape({
    styles: PropTypes.objectOf(PropTypes.string).isRequired,
    javascript: PropTypes.objectOf(PropTypes.string).isRequired,
    assets: PropTypes.object.isRequired,
  }).isRequired,
  helmet: PropTypes.object.isRequired,
};

export default Html;
