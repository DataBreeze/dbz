import Koa from 'koa';
import cookie from 'koa-cookie';

const server = new Koa();
if (__DEV__) {
  const webpack = require('../webpack.server').default;
  webpack(server);
} else {
  const serve = require('koa-static');
  server.use(serve('dist'));
}
server.use(cookie());
server.use(async (ctx) => {
  if (ctx.request.url === '/favicon.ico') {
    console.log('CTX favicon DROP');
  } else {
    // Dynamic require enables hot reloading on the server
    const { render } = require('./server');
    const { status, redirect, body } = await render(ctx.url, ctx.cookie);
    ctx.status = status;
    if (redirect) {
      ctx.redirect(redirect);
    } else {
      ctx.body = body;
    }
  }
});

export default server;
