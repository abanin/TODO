const Container = require("../../models/Container");
const User = require("../../models/User");
const checkUser = require("../../helpers/checkUser");

module.exports = async ctx => {
  // На всякий случай!!))
  if (!checkUser(ctx)) return;

  let user = ctx.state.user;
  const containerId = ctx.params.containerId;
  if (!user.availableContainers.includes(containerId)) {
    ctx.status = 404;
    ctx.body = {
      message: "Данный контейнер вам не доступен. Возможно, не существует"
    };
    return;
  }

  const container = await Container.findById(containerId);
  if (!container) {
    const availableContainers = user.availableContainers.filter(container => {
      return container.toString() !== containerId;
    });
    user = await User.findByIdAndUpdate(
      user.id,
      { availableContainers },
      { new: true }
    );

    ctx.state.user = user;
    ctx.status = 404;
    ctx.body = { message: "Рабочая область не существует" };
    return;
  }
  ctx.body = container;
};
