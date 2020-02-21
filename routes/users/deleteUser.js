const User = require('../../models/User');

module.exports = async (ctx, next) => {
  const user = ctx.state.user;
  await User.findByIdAndDelete(user.id);

  ctx.status = 410;
  ctx.body = {message: "Профиль успешно удален"};
}