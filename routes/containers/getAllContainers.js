const Container = require('../../models/Container');

module.exports = async (ctx, next) => {
  // TODO сделать доступ по определенному ip и секретному коду.
  const user = ctx.state.user;
  if(!user) {
    ctx.status = 401,
    ctx.body = {message: "Не найден пользователь, доступ запрещен"};
    return;
  }

  const containers = await Container.find();
  if(!containers || !containers.length) {
    ctx.status = 404;
    ctx. body = {message: "Нет контейнеров в БД"};
    return;
  }

  ctx.body = containers;
}