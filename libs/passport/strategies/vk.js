const VkStatery = require('passport-vkontakte');
const User = require('../../../models/User')

const options = {
  clientID:     VKONTAKTE_APP_ID, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
  clientSecret: VKONTAKTE_APP_SECRET,
  callbackURL:  "http://localhost:3000/auth/vkontakte/callback",
  scope: ['email'],
  profileFileds: ['email']
}

const vkStatery = new VkStatery(options, async (accessToken, refreshToken, params, profile, done) => {
  const email = params.email;

  //TODO email может приходить не всегда. Обработать эту ошибку или попытаться авторизоваться по другому. Например через телефон
  
  console.log(profile);
  User.find({ email }, (err, user) => {
    if(err) return done(err);

    if(!user) {
      // return done (null, false, {message: "Не удалось найти пользователя по email"});
    }
  })
}) 