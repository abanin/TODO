const User = require("../../models/User");
const passport = require('../../libs/passport');
const jwt = require('jsonwebtoken');
const config = require('config');
const getPublicValueFromPublicFields = require('../../helpers/getPublicValueFromPublicFields');

module.exports = async(ctx, next) => {
  await passport.authenticate('local', (err, user, info) => {
    if(err) ctx.throw(500, {message: "Что то пошло не так"});
    if(!user) {
      ctx.status = 400;
      ctx.body= info;
      return;
    }

    const userPrepare = getPublicValueFromPublicFields(user, User.publicFields);
    
    const payload = {
      userId: userPrepare.id,
      email: userPrepare.email
    }

    const token = jwt.sign(payload, config.get('secretJwt'));
    console.log(token);

    ctx.body = { ...userPrepare, ...info, token: "JWT " + token};
  })(ctx, next);
}