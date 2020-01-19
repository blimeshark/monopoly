var io;
var srv;

exports.initGame = function(sio, socket){
    io = sio
    srv = socket;
    srv.emit('connected', { message: "You are connected!" });

    // Set event listener for host messages
    srv.on('hostNewGame', hostNewGame);

    // Set event listener for player messages
    srv.on('playerJoined', playerJoined);
    srv.on('playerStartGame', playerStartGame);
}

function hostNewGame() {
    var rmId = ( Math.random() * 100000 ) | 0;
    this.emit('newGame', {gameId: rmId, socketId: this.id});
    this.join(rmId.toString());

    //console.log(io.sockets.adapter.rooms);
}

function playerJoined(data) {
    // TODO: Implement player joined to send back to client window

    // fn playerJoined listens to srv socket event 'playerJoined'
    //var gameId = srv.manager.rooms["/" + data.gameId];
    //console.log(Object.keys(io.sockets.adapter.rooms));
    var gameRoom = io.sockets.adapter.rooms[data.gameId];
    console.log('Game room: ');
    console.log(gameRoom);

    if (gameRoom != undefined) {
        // TODO: do not let players join if room is full
        var clients = gameRoom.sockets;
        console.log('Clients in room: ' + data.gameId);
        console.log(clients);

        //console.log('Room ' + data.gameId + ' has ' + clients + ' clients');

        if (clients >= 6)
        {
            // Room is already full. We are just waiting until someone starts the game
            // TODO: maybe send message to client that room is full.
        }
        else
        {
            // Why we need to save the client socket ID?
            data.socketId = this.id;
            console.log('Socket ID: ' + this.id);

            this.join(data.gameId);

            clients = gameRoom.sockets;
            console.log('Clients in room: ' + data.gameId);
            console.log(clients);

            io.sockets.in(data.gameId).emit('playerJoinedGame', data);            
        }
    }
    else
    {
        console.log('Game room not found.');
        this.emit('errorMsg', {message: "Game ID does not exist."});
    }
}

function playerStartGame(data) {
    // TODO: Implement
    console.log('Player ' + data.username + ' requested game to start.');
    console.log('Maybe we should redraw the main display here.');
}