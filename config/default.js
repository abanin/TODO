const path = require("path");

module.exports = {
  // secret data can be moved to env variables
  // or a separate config
  port: 3000,
  secret: "mysecret",
  secretJwt: 'hashSecretKeyYanusik',
  prefixs: {
    users: "/users",
    containers: "/containers"
  },
  apiBaseUri: "/api/v1",
  root: process.cwd(),
  templatesRoot: path.join(process.cwd(), "templates"),
  mongodb: {
    debug: true,
    uri:
      "mongodb+srv://abanin:1234@cluster0-j3dso.azure.mongodb.net/test?retryWrites=true&w=majority"
  },
  User: {
    minLenPassword: 4,
    maxFileSize: 160000
  },
  crypto: {
    hash: {
      length: 128,
      iterations: 10
    }
  }
};
