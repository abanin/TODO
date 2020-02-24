const Todo = require('../../models/Todo');

module.exports = async (ctx, next) => {
  const user = ctx.state.user;
  const container = ctx.state.container;
  const todo = ctx.request.body;
  
  const newTodo = await Todo.create({...todo, owner: user.id, container: container.id});

  ctx.body = newTodo;
}