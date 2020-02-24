const User = require('../../models/User')

module.exports = async (ctx, next) => {
  const userById = await User.findById(ctx.params.userId)
  ctx.body = userById.toObject();
}