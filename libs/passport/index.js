const passport = require('koa-passport');
const User = require('../../models/User');
const localStategy = require('./strategies/local');
const jwtStrategy = require('./strategies/jwt');


// Для сессий
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((user, done) => {
//   User.findById(user.id, (err, user) => {
//     if(err) throw new Error('[deserializeUser]') // TODO  написать нормальный текст ошибки
//     done(null, user)
//   })
// })


passport.use(localStategy);
passport.use(jwtStrategy);

module.exports = passport;
