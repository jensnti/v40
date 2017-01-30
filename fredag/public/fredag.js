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
    players.push(p);
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

// updateRats, kallas av socket emit på userMv
// för att uppdatera alla spelare
function updateRats(pUpd) {
//    ctx.clearRect(0, 0, 450, 450); // rensa
    // uppdatera värden för spelaren som rörde på sig
    // rita om alla spelare
    for(var i = 0; i < players.length; i++) {
        if (players[i].id == pUpd.id) {
            players[i].x = pUpd.x;
            players[i].y = pUpd.y;
            drawRat(players[i].x, players[i].y, players[i].color, players[i].size);
        } else {
            drawRat(players[i].x, players[i].y, players[i].color, players[i].size);
        }
    }
}

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
    updateRats(p);
});