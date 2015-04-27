var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 1337;
var users = {};


app.get('/test.html', function(reg,res){
  res.sendfile('public/test.html');
});

app.get('/', function(req, res){
  res.sendfile('public/');
});


io.on('connection', function(socket){
    var sId = socket.id;
   console.log('a user connected');
   users[sId] = {
    id: sId
   };

io.to(socket.id).emit('sendSocketID', socket.id);

   io.emit('chat message', 'Welcome user');
   socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg);

  });

   socket.on('sendPosition', function(data){
    users[sId].marker = data;
    console.log(data);
    io.emit('sendUsers', users);
   });

   socket.on('disconnect', function(socket){
    console.log('User Disconnected.');
    delete users[sId];
    console.log(users);
})
});


// setInterval(function(){
// emitMarkers();
//  }, 5000);

// function emitMarkers(){
// if( Object.keys(users).length > 0  ){
//  io.emit('addMarkers', users);
// }else{
 
  // console.log(users);
// }

// }


http.listen(port, function(){
  console.log('listening on *:1337');
});