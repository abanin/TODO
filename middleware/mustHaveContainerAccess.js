const User = require('../models/User');
const Container = require('../models/Container');

module.exports = async (ctx, next) => {
  let user = ctx.state.user;
  const containerId = ctx.params.containerId;

  if (!ctx.state.user.availableContainers.includes(containerId.toString())) {
    ctx.status = 401;
    ctx.body = {
      message: "Данная рабочая область не доступна."
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


  ctx.state.container = container;
  
  await next();
}