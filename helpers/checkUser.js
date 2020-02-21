module.exports = ctx => {
  if (!ctx.state.user) {
    ctx.status = 401;
    ctx.body = { message: "Доступ запрещен" };
    return false
  }
  return true;
};
