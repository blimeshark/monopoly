const port = 8080
const path = require('path');
const express = require('express');
const app = express();

// Specify where static assets are located.
app.use(express.static(path.join(__dirname,'static'))); 

const server = require('http').Server(app).listen(8080, '192.168.1.146');
const io = require('socket.io')(server);

// Import instance of the game
var mnp = require('./game.js');

io.sockets.on('connection', function(socket) {
	// TODO: Deal with disconnected client? Page refresh?
    mnp.initGame(io, socket);
});


