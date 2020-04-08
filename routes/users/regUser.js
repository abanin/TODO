const User = require("../../models/User");
const jwt = require('jsonwebtoken');
const config = require('config');
const getPublicValueFromPublicFields = require("../../helpers/getPublicValueFromPublicFields");

module.exports = async (ctx, next) => {
  const publicValue = getPublicValueFromPublicFields(
    ctx.request.body,
    User.publicFields
  );
  publicValue.password = ctx.request.body.password

  console.log('body', ctx.request.body);
  console.log(publicValue);
  
  if (!Object.keys(publicValue).length) {
    console.error("Routes [regUser.js]: not valid request.body");
    ctx.status = 400;
    ctx.body = {message: "Передайте корректные значения для создания пользователя"};
    return
  }
  // TODO оптмизировать логику работы.

  const user = await User.create(publicValue);
  await user.setPassword(ctx.request.body.password);
  await user.save();

  if (!user) {
    console.error("Routes [regUser.js]: Что то пошло не так");
    ctx.status = 400;
    ctx.body = {message: "Что то пошло не так" };  // TODO придумать нормальный текст для ошибки
    return
  }

  const payload = {
    userId: user.id,
    email: user.email
  }

  const token = jwt.sign(payload, config.get('secretJwt'));
  ctx.status = 201;
  ctx.body = {...user.toObject(),  token: "JWT " + token};
};
