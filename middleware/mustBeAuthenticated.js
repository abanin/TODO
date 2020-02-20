const passport = require('../libs/passport');

module.exports = async (ctx, next) => {
  await passport.authenticate('jwt', {session: false}, async (err, user) => {
    if(err) {
      ctx.status = 401;
      ctx.body = {message: "Вы не авторизованы"};
    }

    if(user) {
      ctx.state.user = user;
      await next();
    } else {
      ctx.status = 401;
      ctx.body = {message: "Пользователь не найден. Доступ запрещен!"};
    }
  })(ctx, next);
}