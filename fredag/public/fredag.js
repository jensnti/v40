// socket objekt
var socket = io();

// skapar ett spelarobjekt
var player  = {
    id: Math.floor(Math.random()*1000),
    color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    size: Math.floor(Math.random()*20)
};

// för att hålla reda på alla spelare
var players = [];

// TODO: man ser bara spelare som connectar efter sig själv

// när vi connectar skickar vi vår player
socket.emit('pConnect', player);
// ta emot player objekt från andra spelare och lägg till i players
socket.on('pConnect', function (p) {
    players = p;
});

// msg att någon kopplade upp sig
socket.on('userMsg', function (msg) {
    $('#messages').append($('<li>').text(msg));
});

// canvas vars
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// drawRat, tar x y och color för en spelare och ritar upp
function drawRat(x, y, c, s) {
    ctx.fillStyle = c;
    ctx.fillRect(x ,y ,s ,s);
}

function update() {
  for (var player in players) {
    drawRat(players[player].x, players[player].y, players[player].color, players[player].size);
  }
  requestAnimationFrame(update);
}
// updateRats, kallas av socket emit på userMv
// för att uppdatera alla spelare

// bind keydown för att tillåta spelaren att flytta sin pjäs
document.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }
    switch (event.key) {
    case "w":
        player.y -= 10;
        socket.emit('userMv', player);
        break;
    case "a":
        player.x -= 10;
        socket.emit('userMv', player);
        break;
    case "s":
        player.y += 10;
        socket.emit('userMv', player);
        break;
    case "d":
        player.x += 10;
        socket.emit('userMv', player);
        break;
    default:
        break;
    }

  event.preventDefault();
}, true);

// socket on event för userMv
socket.on('userMv', function (p) {
  players = p;
});

requestAnimationFrame(update);