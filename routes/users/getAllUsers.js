const User = require('../../models/User');

module.exports = async (ctx, next) => {
  const users = await User.find();
  if(!users.length) {
    ctx.throw(404, {message: 'not found users'});
  }
  const prepareUsers = users.map((user) => {
    return user.toObject();
  })

  ctx.body = prepareUsers;
}