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
  prefix: `${config.get('apiBaseUri')}${config.get('prefixs.users')}`
});

const containerRouter = new Router({
  prefix: `${config.get('apiBaseUri')}${config.get('prefixs.containers')}`
})
const router = new Router();

// const loadUserById = require('./middleware/loadUserById');
const mustBeAuthenticated = require('./middleware/mustBeAuthenticated');


userRouter
.get('/', mustBeAuthenticated, require('./routes/users/getAllUsers'))
.post('/reg', require('./routes/users/regUser'))
.post('/login', require('./routes/users/loginUser'))
.get('/:userId', mustBeAuthenticated,  require('./routes/users/getUserById'))
.delete('/', mustBeAuthenticated, require('./routes/users/deleteUser'));
// .patch('/:userId',loadUserById, async (ctx, next) => {
//   ctx.body = {msg: "Пользователь отредактирован"}
// })

containerRouter
.get('/', mustBeAuthenticated, require('./routes/containers/getAllContainers'))
.get('/:containerId', mustBeAuthenticated, require('./routes/containers/getByIdContainer'))
.post('/create', mustBeAuthenticated, require('./routes/containers/createContainers'));


router.get('/', async (ctx, next) => {
  ctx.body = {msg: "Hello world"}
});



app.use(userRouter.routes());
app.use(containerRouter.routes());
app.use(router.routes());

module.exports = app;