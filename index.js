var express = require('express');
var socket=require('socket.io');

var app = express();

app.use(express.static('public'));

var server= app.listen(4000, function () {
	console.log('listen to request on port 4000');
});


// socket.io setup
var io=socket(server);


io.on('connection',function (socket) {
  console.log('made socket connection',socket.id); 

  // section for emitting of the chat from various users
   socket.on('chat',function (data) {
     io.sockets.emit('chat',data);
   });
    // section for emitting of the private chat 
   socket.on('private',function (data) {
     io.sockets.sockets[data.handle].emit('private',{from:client.id,to:data.handle,message:data.message});
     io.socket.emit('private',{from:client.id,to:data.handle,message:data.message});
   });
  // updating other users the present user typing 
  socket.on('typing',function (data) {
     socket.broadcast.emit('typing',data);
   });
  // when the client emits add user this section listen and executes

  socket.on ('add user',function (data) {
     socket.broadcast.emit('typing',data);
   });

}); 