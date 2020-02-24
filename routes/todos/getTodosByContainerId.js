const Todo = require('../../models/Todo')

module.exports = async (ctx, next) => {
  const todos = await Todo.find({container: ctx.state.container.id});

  ctx.body = todos;
}