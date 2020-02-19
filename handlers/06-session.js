const session = require('koa-session');
const mongooseStore = require('koa-session-mongoose');
const mongoose = require('../libs/mongoose');

/*
const sessions = {
  [id]: {count: 4}
};
*/
// ctx.session

const sessionConfig = {
  signed: false,

  store: mongooseStore.create({
    name: 'Session',
    expires: 3600 * 4,
    connection: mongoose
  })
}
exports.init = app => app.use(session(sessionConfig, app));

