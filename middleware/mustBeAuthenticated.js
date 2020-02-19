const passport = require('../libs/passport');

module.exports = async (ctx, next) => {
  await passport.authenticate('jwt', {session: false}, async (err, user) => {
    if(err) {
      ctx.status = 401;
      ctx.body = {message: "Вы не авторизованы"};
    }

    console.log('USER!!!');

    if(user) {
      await next();
    } else {
      ctx.status = 404;
      ctx.body = {message: "Пользователь не найден !!!"};
    }
  })(ctx, next);
}