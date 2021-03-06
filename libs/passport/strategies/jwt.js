const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./../../../models/User');
const config = require('config');


const options = {
  secretOrKey: config.get('secretJwt'),
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}



const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
  if(!payload.userId) {
    return done(null, false, {message: "Передан некорректный токен"});
  }

  const user = await User.findById(payload.userId);

  if(!user) {
    return done(null, false, {message: "Пользователь не найден"});
  }

  return done(null, user, {message: "Пользователь найден"}); 
});


module.exports = jwtStrategy;