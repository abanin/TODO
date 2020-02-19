const Koa = require('koa');
const app = new Koa();
const config = require('config');

require('./handlers/01-favicon').init(app);
require('./handlers/02-static').init(app);
require('./handlers/03-logger').init(app);
require('./handlers/04-templates').init(app);
require('./handlers/05-errors').init(app);
require('./handlers/06-session').init(app);
require('./handlers/07-bodyParser').init(app);


const Router = require('koa-router');
const userRouter = new Router({
  prefix: `${config.get('apiBaseUri')}${config.get('prefixs').users}`
});
const router = new Router();

const loadUserById = require('./middleware/loadUserById');
const mustBeAuthenticated = require('./middleware/mustBeAuthenticated');


userRouter
.get('/', mustBeAuthenticated, require('./routes/users/getAllUsers'))
.post('/reg', require('./routes/users/regUser'))
.post('/login', require('./routes/users/loginUser'))
.get('/:userId', mustBeAuthenticated, loadUserById,  require('./routes/users/getUserById'))
.delete('/:userId', mustBeAuthenticated, loadUserById,  async(ctx, next) => {
  ctx.body = {msg: "Пользователь удален"}
})
// .patch('/:userId',loadUserById, async (ctx, next) => {
//   ctx.body = {msg: "Пользователь отредактирован"}
// })



router.get('/', async (ctx, next) => {
  console.log(`${config.get('apiBaseUri')}${config.get('prefixs').users}`);
  ctx.body = {msg: "Hello world"}
});



app.use(userRouter.routes());
app.use(router.routes());

module.exports = app;