const Todo = require('../../models/Todo');
const getPublicValueFromPublicFields = require('../../helpers/getPublicValueFromPublicFields');

module.exports = async (ctx, next) => {
  const todoId = ctx.params.todoId;
  const container = ctx.state.container;
  const newTodo = getPublicValueFromPublicFields(ctx.request.body, Todo.publicFields);

  const updateTodo = await Todo.findOneAndUpdate({container: container.id, _id: todoId }, {...newTodo}, { new: true });
  console.log(updateTodo);
  ctx.body = updateTodo;
}