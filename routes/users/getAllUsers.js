const User = require('../../models/User');

module.exports = async (ctx, next) => {
  const users = await User.find();
  const prepareUsers = users.map((user) => {
    return user.toObject();
  })

  ctx.body = prepareUsers;
}