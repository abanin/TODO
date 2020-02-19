const User = require("../../models/User");
const getPublicValueFromPublicFields = require("../../helpers/getPublicValueFromPublicFields");

module.exports = async (ctx, next) => {
  const publicValue = getPublicValueFromPublicFields(
    ctx.request.body,
    User.publicFields
  );
  if (!Object.keys(publicValue).length) {
    console.error("Routes [regUser.js]: not valid request.body");
    ctx.throw(400, {
      message: "Передайте корректные значения для создания пользователя"
    });
  }
  // TODO оптмизировать логику работы.
  const user = await User.create(publicValue);
  await user.setPassword(ctx.request.body.password);
  await user.save();

  if (!user) {
    console.error("Routes [regUser.js]: Что то пошло не так");
    ctx.throw(500, { message: "Что то пошло не так" }); // TODO придумать нормальный текст для ошибки
  }
  ctx.body = user.toObject();
};
