const Container = require("../../models/Container");
const User = require("../../models/User");
const getPublicValueFromPublicFields = require("./../../helpers/getPublicValueFromPublicFields");

module.exports = async (ctx, next) => {
  const user = ctx.state.user;
  if (!user) {
    ctx.status = 401;
    ctx.body = { message: "Доступ запрещен" };
    return;
  }

  const { title } = getPublicValueFromPublicFields(
    ctx.request.body,
    Container.publicFields
  );

  if (!title) {
    ctx.state = 400;
    ctx.body = { message: "Не переданы данные для создания рабочей области" };
    return;
  }

  const container = await Container.create({ title, owners: [user.id] });
  const availableContainers = user.availableContainers || [];

  const newUser = await User.findByIdAndUpdate(
    user.id,
    { availableContainers: [...availableContainers, container.id] },
    { new: true }
  );

  if (newUser) {
    ctx.state.user = newUser;
    ctx.status = 201;
    ctx.body = newUser.toObject();
  }
};
