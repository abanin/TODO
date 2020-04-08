const socketIO = require('socket.io')
const User = require('../models/User')


function socket(server) {
  const io = socketIO(server);

  io.use(async (socket, next) => {
    console.log(socket);
      

    socket.on('disconnect', function() {
      console.log('disconnected!!!')
    });

    next();
  })

  io.on('connection', (socket) => {
    console.log('Connection socket established');
    
    socket.on('message', function(data) {
      console.log("message recieved ", data);
    })

    socket.on('newChatMessage', data => {
      io.emit('newChatMessage', data); 
    })
  })

}


module.exports = socket;