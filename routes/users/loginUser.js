const User = require("../../models/User");
const passport = require('../../libs/passport');
const jwt = require('jsonwebtoken');
const config = require('config');
const getPublicValueFromPublicFields = require('../../helpers/getPublicValueFromPublicFields');

module.exports = async(ctx, next) => {
  await passport.authenticate('local', (err, user, info) => {
    if(err) ctx.throw(500, {message: "Что то пошло не так"});

    const userPrepare = getPublicValueFromPublicFields(user, User.publicFields);
    
    const payload = {
      userId: userPrepare.id,
      email: userPrepare.email
    }
    
    // TODO set ttl jwt;
    const token = jwt.sign(payload, config.get('secretJwt'));
    ctx.body = { ...userPrepare, ...info, token: "JWT " + token};
  })(ctx, next);
}