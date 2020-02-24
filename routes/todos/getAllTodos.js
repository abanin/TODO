const Todo = require('../../models/Todo');

module.exports = async (ctx, next) => {
  ctx.body = await Todo.find();
}