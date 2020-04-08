const cors = require("@koa/cors");
const config = {
  origin: "http://localhost:4200",
  credentials: true
}
exports.init = app => app.use(cors(config));
