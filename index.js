const app = require('./app');
const config = require('config');



app.listen(config.get('port'), (err) => {
  err 
    ? console.error(err)
    : console.log(`Server has been started on port: ${config.get('port')}`);
})