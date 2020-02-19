module.exports = async (ctx, next) => {
  if(!ctx.state.userById) {
    console.error("[routes: getUserById] ctx.state.userById is undefined")
    ctx.throw(500, {message: "Что то пошло не так"});
  }
  
  ctx.body = ctx.state.userById.toObject();
}