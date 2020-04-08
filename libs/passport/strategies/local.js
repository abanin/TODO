const LocalStrategy = require('passport-local');
const User = require('../../../models/User');


const localStategies = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, async(email, password, done) => {
  try {
    console.log('HELLO');
    const user = await User.findOne({ email });
    if(!user) {
      return done(null, false, {message: "Пользователь не найден"})
    }

    const isPasswortValid = await user.checkPassword(password);

    if(!isPasswortValid) {
      return done(null, false, {message: "Неправильный пароль"});
    }
    
    user.lastLoginDate = new Date();
    await user.save();
    return done(null, user, {message: "Добро пожаловать!"});
    
  } catch (error) {
    console.error(error);
    done(error);
  }
})


module.exports = localStategies;