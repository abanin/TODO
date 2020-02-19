const User = require("./../models/User");
const mongoose = require("./../libs/mongoose");

module.exports = async (ctx, next) => {
  const id = ctx.params.userId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.status = 400;
    ctx.body = {message: "Неправильный формат userId"}
    return;
  }

  const userById = await User.findById(id);
  if (!userById) {
    ctx.status = 404;
    ctx.body = {message: `Пользователь c id ${id} не найден`};
    return;
  }

  ctx.state.userById = userById;
  await next();
};
