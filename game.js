var io;
var srv;

exports.initGame = function(sio, socket){
    io = sio
    srv = socket;
    srv.emit('connected', { message: "You are connected!" });

    // Set event listener for host messages
    srv.on('hostNewGame', hostNewGame);
    srv.on('hostUpdatePlayerTurn', hostUpdatePlayerTurn);

    // Set event listener for player messages
    srv.on('playerJoined', playerJoined);
    srv.on('playerStartGame', playerStartGame);
    srv.on('playerRollDice', playerRollDice);
}

function hostNewGame() {
    var rmId = ( Math.random() * 100000 ) | 0;
    this.emit('newGame', {gameId: rmId, socketId: this.id});
    this.join(rmId.toString());

    io.sockets.adapter.rooms[rmId].tokens = ['scottish_terrier', 'battleship', 'race_car', 'top_hat', 'penguin', 't_rex', 'cat', 'rubber_ducky'];

    //console.log(io.sockets.adapter.rooms);
}

function hostUpdatePlayerTurn(data) {
    //console.log('hostUpdatePlayerTurn received with data');
    //console.log(data);
    var gameRoom = io.sockets.adapter.rooms[data.gameId];

    if (gameRoom != undefined) {
        io.sockets.in(data.gameId).emit('playerUpdateTurn', data);
    }
}

function playerJoined(data) {
    var gameRoom = io.sockets.adapter.rooms[data.gameId];

    if (gameRoom != undefined) {
        // TODO: do not let players join if room is full
        var clients = gameRoom.sockets;
        var availableTokens = io.sockets.adapter.rooms[data.gameId].tokens;
        var tokenIndex = availableTokens.indexOf(data.token);
        //console.log('Available tokens for room ' + data.gameId + ' ' + availableTokens);

        if (clients >= 6)
        {
            // Room is already full. We are just waiting until someone starts the game
            // TODO: maybe send message to client that room is full.
            this.emit('joinGameError',  {errorMsg: "Game room is already full."});
        }

        else if (tokenIndex == -1)
        {
            this.emit('joinGameError', {errorMsg: "Token not available."});

        }
        else
        {
            availableTokens.splice(tokenIndex, 1);

            /* Save client ID to identify each user and the host */
            data.socketId = this.id;

            this.join(data.gameId);

            io.sockets.in(data.gameId).emit('playerJoinedGame', data);
        }
    }
    else
    {
        this.emit('joinGameError', {errorMsg: "Game ID does not exist."});
    }
}

function playerStartGame(data) {
    // TODO: Implement
    // console.log('Player ' + data.username + ' requested game to start.');
    // console.log('Maybe we should redraw the main display here.');

    io.sockets.in(data.gameId).emit('startGame', data);
}

function playerRollDice(data) {
    io.sockets.in(data.gameId).emit('rollDice', data);
}