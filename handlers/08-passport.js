const passport = require('koa-passport')

app.use(passport.initialize())
app.use(passport.session())