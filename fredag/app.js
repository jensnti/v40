var express = require('express');
var app = express(); // som tidigare nytt exprese objekt
var http = require('http').Server(app); // vi skickar http server objektet till socket
var io = require('socket.io')(http); // sedan säger vi åt socket.io att lyssna på servern


app.use(express.static('public'));

// servera statiskt html sida
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/fredag', function (req, res) {
  res.sendFile(__dirname + '/public/fredag.html');
});

app.get('/cam', function (req, res) {
  res.sendFile(__dirname + '/public/cam.html');
});

// anv io både connect och disconnect triggar events, som vi då binder till en callback
// som körs när det händer
// dessa events använder vi för att skapa vår chatclient
io.on('connection', function (socket) {
    console.log('a user connected' + socket.request.connection.remoteAddress);
    io.emit('userMsg', 'User connected');
    socket.on('disconnect', function () {
        console.log('user disconnected' + socket.request.connection.remoteAddress);
        io.emit('userMsg', 'User disconnected');
    });

    socket.on('pConnect', function (pObj) {
        io.emit('pConnect', pObj);
    });

    socket.on('userMv', function (cords) {
        io.emit('userMv', cords);
    });
});

http.listen(8080, function () {
  console.log('listening on *:3000');
});