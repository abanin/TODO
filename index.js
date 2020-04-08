const app = require('./app');
const config = require('config');
const socket = require('./libs/socket');



const server = app.listen(config.get('port'), (err) => {
  err 
    ? console.error(err)
    : console.log(`Server has been started on port: ${config.get('port')}`);
});


socket(server);