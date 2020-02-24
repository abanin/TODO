const Todo = require('../../models/Todo');

module.exports = async (ctx, next) => {
  const todoId = ctx.params.todoId;
  const container = ctx.state.container;
  const todoDelete = await Todo.findOneAndDelete({container: container.id, _id: todoId });

  ctx.status = 410;
  ctx.body = todoDelete;
}