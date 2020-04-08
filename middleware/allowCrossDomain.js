module.exports = function allowCrossDomain(ctx, next) {
  // ctx.res.header('Access-Control-Allow-Origin', "*");
  // ctx.res.header('Access-Control-Allow-Headers', "*");
  next();
}