var client = {
    init: function() {
        client.socket = io.connect();
        client.eventListenerInit();
    },

    eventListenerInit: function() {
        client.socket.on('connected', client.onConnect);
        client.socket.on('newGame', client.onNewGame);
        client.socket.on('startGame', client.onStartGame);
        client.socket.on('rollDice', client.onPlayerRollDice);
        client.socket.on('playerJoinedGame', client.playerJoinedGame);
        client.socket.on('playerUpdateTurn', client.playerUpdateTurn);
        client.socket.on('joinGameError', client.joinGameError);
    },

    onConnect: function() {
        app.socketId = client.socket.id;
    },

    onNewGame: function(data) {
        app.host.gameInit(data);
    },

    /**
     * Callback to when a player joins a game.
     * Update the Min display list showing players who have joined.
     * Update the Player screen showing 'Waiting for Players' message and the
     * 'Start Game' button.
     */
    playerJoinedGame: function(data) {
        console.log('playerJoinedGame received');
        // console.log('A player joined. Update the main and player display.');
        if (!("errorMsg" in data))
        {
            app.host.updateWaitingDisplay(data);
            app.player.showPlayerWaitingDisplay(data);
        }
        else
        {
            console.log('playerJoinedGame data: ' + data);
        }
    },

    joinGameError: function(data) {
        if ("errorMsg" in data)
        {
            app.player.showPlayerWaitingDisplay(data);
        }
    },

    playerUpdateTurn: function(data) {
        app.player.updateTurn(data);
    },

    onStartGame: function(data) {
        // console.log('Player ' + data.username + ' called startGame. Update mainDisplay and all player screen');

        if (app.role == 1)
        {
            /* Display the Monopoly board. */
            app.host.showHostGameArea(data);
        }
    },

    onPlayerRollDice: function(data) {
        // TODO: What happens when r1 == r2 during a game dice roll.

        if (app.role == 1)
        {
            app.host.movePlayer(data);
        }
    }
};

var app = {
    gameId: 0, // Room ID for a given game instance
    socketId: '', // The cached value of the socket.IO session ID
    role: 0,

    init: function() {
        app.initElements();
        app.initEvents();
        app.showInitDisplay();

        FastClick.attach(document.body);
    },

    initElements: function() {
        app.$templateIntro = $('#intro-screen-template').html();
        app.$templatePreGame = $('#pregame-screen-template').html();
        app.$templateJoinGame = $('#joingame-screen-template').html();
        app.$templateWaitForPlayers = $('#waitforplayers-screen-template').html();
        app.$templateGameArea = $('#gamearea-screen-template').html();
        app.$templatePlayerScreen = $('#player-screen-template').html();
        app.$templatePlayerWaitScreen = $('#player-screen-wait-template').html();
    },

    initEvents: function() {
        document.addEventListener("click", app.commonEventListener);
        //document.getElementById("btnNewGame").addEventListener("click", app.eventListener);
        //document.getElementById("btnJoinGame").addEventListener("click", app.eventListener);
        //document.getElementById("btnRollDiceInit").addEventListener("click", app.eventListener);
        //document.getElementById("btnRollDice").addEventListener("click", app.eventListener);
        //document.getElementById("btnEnterGame").addEventListener("click", app.eventListener);
        //document.getElementById("btnStartGame").addEventListener("click", app.eventListener);
    },

    commonEventListener: function(event) {
        switch (event.target.id) {
            case "btnNewGame":
                app.host.onNewGameClick();
                break;
            case "btnJoinGame":
                app.player.onJoinGameClick();
                break;
            case "btnRollDiceInit":
                app.player.onRollDiceInitClick();
                break;
            case "btnRollDice":
                app.player.onRollDiceClick();
                break;
            case "btnEnterGame":
                app.player.onJoinExistingGameClick();
                break;
            case "btnStartGame":
                app.player.onStartGameClick();
                break;
            default:
                // console.log("No associated action for event.");
        }
    },

    showInitDisplay: function() {
        document.getElementById("mainDisplay").innerHTML = app.$templateIntro;
        app.fitText('.title');
    },

    /** Utility functions **/
    fitText: function(identifier) {
        var element;

        if (identifier.charAt(0) == '.')
        {
            element = document.getElementsByClassName(identifier.substring(1))[0];
        }

        else
        {
            element = document.getElementById(identifier.substring(1));
        }

        textFit(
            element,
            {
                alignHoriz:true,
                alignVert:false,
                widthOnly:true,
                reProcess:true,
                maxFontSize:300
            }
        )
    },

    host: {
        players: [],
        numPlayers: 0,
        gameInProgress: false,
        playerIndex: 0, // Index of current player turn
        gameSketch: null,

        gameInit: function(data) {
            app.gameId = data.gameId;
            app.socketId = data.socketId;
            app.role = 1;
            app.host.numPlayers = 0;

            app.host.showNewGameDisplay();
        },

        onNewGameClick: function() {
            client.socket.emit('hostNewGame');
        },

        showNewGameDisplay: function() {
            // Show the player join screen in the main display with the room ID
            document.getElementById("mainDisplay").innerHTML = app.$templatePreGame;
            document.getElementById("gameURL").innerHTML = window.location.href;
            app.fitText("#gameURL");
            document.getElementById("roomId").innerHTML = app.gameId;
        },

        /**
         * This function is called when a player joins a game.
         * It updates the Main display to show the players who have joined.
         */
        updateWaitingDisplay: function(data) {
            // TODO: Deal with case if new game restarted.

            if (app.host.numPlayers < 6 && app.role == 1)
            {
                var joinMsg = "<p>Player " + data.username + " joined.<p>";
                document.getElementById('playersInRoom').insertAdjacentHTML('beforeend', joinMsg);

                var p = new Player(data.username, data.rollValue, data.socketId, data.token);

                app.host.players.push(p);
                app.host.numPlayers += 1;

                // TODO: Display an error message if 6 players already that room is full.
                // console.log('numPlayers: ' + app.host.numPlayers);
            }
        },

        orderPlayers: function() {
            app.host.players.sort((a, b) => (a.initRollValue > b.initRollValue) ? -1 : 1);
        },

        showHostGameArea: function(data) {
            app.host.gameInProgress = true;

            app.host.orderPlayers();
            app.host.playerIndex = 0;

            document.getElementById("mainDisplay").innerHTML = app.$templateGameArea;

            app.host.gameSketch = new p5(gameAreaSketch);
            app.host.gameSketch.players = app.host.players;

            // TODO: Update turn
            // Emit event to all players to set app.plauyer.tokenTurn accordingly.
            var data = {
                socketId: app.host.players[app.host.playerIndex].socketId,
                gameId: app.gameId,
            }

            client.socket.emit('hostUpdatePlayerTurn', data);

            // TODO
            // Update display to show player name's turn
            // Maybe setup socket listener to only wait for turnEvent from this player
            // Update other player's screen to prevent turn but allow trades
        },


        movePlayer: function(data) {
            console.log('Received dice roll from player: ' + data.username + " value: " + data.roll1 + " " + data.roll2);

            let player;
            for (player of app.host.players)
            {
                // TODO: Implement no 2 players can have the same username in a game.
                if (player.username == data.username)
                {
                    player.move(data.roll1 + data.roll2);
                    break;

                    //player.spot += (data.roll1 + data.roll2);
                    //if (player.spot > 39)
                    //{
                    //    player.spot = player.spot - 40;
                    //}
                }
            }

            if (app.host.playerIndex + 1 == app.host.players.length)
            {
                app.host.playerIndex = 0;
            }
            else
            {
                app.host.playerIndex += 1;
            }

            var data = {
                socketId: app.host.players[app.host.playerIndex].socketId, // socket ID of player object in app.host.players[playerIndex]
                gameId: app.gameId,
            }

            client.socket.emit('hostUpdatePlayerTurn', data);
            console.log('hostUpdatePlayerTurn emit event');
        },
    },


    player: {
        balance: 0,
        hostSocketId: '',
        username: '',
        diceSketch: null,
        initRollAttempts: 2, // Number of attempts to roll dice at the start of the game
        tokenTurn: false,

        onJoinGameClick: function() {
            document.getElementById("mainDisplay").innerHTML = app.$templateJoinGame;

            app.player.diceSketch = new p5(diceSketch);
        },

        onJoinExistingGameClick: function() {
            var rollData;

            if (app.player.diceSketch != null) {
                rollData = app.player.diceSketch.getRollValue();
            }

            var data = {
                gameId: document.getElementById("inputGameId").value,
                username: document.getElementById("inputUsername").value,
                rollValue: rollData['r1'] + rollData['r2'],
                socketId: app.socketId,
                token: document.getElementById("inputToken").value,
            }

            // TODO: Check name is valid and game ID exists on server.
            // TODO: Check rollValue is not null

            client.socket.emit('playerJoined', data);

            app.role = 0;
            app.player.username = data.username;
        },

        onStartGameClick: function() {
            // app.gameId should be set at this point.

            var data = {
                gameId: app.gameId,
                username: app.player.username,
            }

            client.socket.emit('playerStartGame', data);
        },

        onRollDiceClick: function () {
            if (app.player.tokenTurn == true)
            {
                // Only emit playerRollDice event if it is the player's turn.
                var data = {
                    gameId: app.gameId,
                    username: app.player.username,
                    roll1: 0,
                    roll2: 0,
                }

                var r1 = Math.floor(Math.random() * 6) + 1;
                var r2 = Math.floor(Math.random() * 6) + 1;

                data.roll1 = r1;
                data.roll2 = r2;

                console.log("Player rolled dice r1: " + r1 + " r2 " + r2);
                client.socket.emit('playerRollDice', data);
            }
        },

        onRollDiceInitClick: function() {
            var data;

            // TODO: WIP
            // Pass roll values to game to determine turns
            // Resolve same value rolls between players.

            if (app.player.initRollAttempts == 0)
            {
                document.getElementById("joinGameError").innerHTML = "Exceeded dice roll attempts.";
                document.activeElement.blur(); // Remove focus from 'Roll Dice' button
            }

            else if (app.player.diceSketch != null)
            {
                document.getElementById("btnRollDiceInit").setAttribute('disabled', true);
                document.getElementById("btnRollDiceInit").innerHTML = 'Rolling..';

                app.player.initRollAttempts -= 1;
                app.player.diceSketch.customStart();

                setTimeout(function() {
                    document.getElementById("btnRollDiceInit").innerHTML = 'Roll Dice';
                    document.getElementById("btnRollDiceInit").removeAttribute('disabled');

                    data = app.player.diceSketch.getRollValue();
                    console.log('Player rolled: ' + data['r1'] + ' and ' + data['r2']);
                }, 2000);            
            }
        },

        updateTurn: function(data) {
            // TODO: Update this to show player screen only if tokenTurn is true
            // See showPlayerScreen below (should only show for player with current turn).
            console.log("App.socketId: " + app.socketId + " data.socketId: " + data.socketId);

            if (data.socketId == app.socketId)
            {
                app.player.tokenTurn = true;
            }
            else
            {
                app.player.tokenTurn = false;
            }

            app.player.showPlayerScreen(data);
        },

        /**
         * This function updates the Player's screen to show the
         * 'Waiting for Players' message and 'Start Game' button.
         */
        showPlayerWaitingDisplay: function(data) {
            // console.log("Socket ID: " + client.socket.id + " Cached Value: " + app.socketId);

            if ("errorMsg" in data)
            {
                document.getElementById("joinGameError").innerHTML = "<p>" + data.errorMsg + "</p>";
                document.activeElement.blur(); // Remove focus from 'Enter Game' button
            }
            else if (client.socket.id == data.socketId)
            {
                app.role = 0;
                app.gameId = data.gameId;

                document.getElementById("mainDisplay").innerHTML = app.$templateWaitForPlayers;
            }
        },

        showPlayerScreen: function(data) {
            if (app.role == 1)
            {
                return;
            }

            if (app.player.tokenTurn == true)
            {
                document.getElementById("mainDisplay").innerHTML = app.$templatePlayerScreen;
                document.getElementById("playerId").innerHTML = "Player: " + app.player.username;
            }
            else
            {
                document.getElementById("mainDisplay").innerHTML = app.$templatePlayerWaitScreen;
                document.getElementById("playerId").innerHTML = "Player: " + app.player.username;
            }            
        },
    },
};

client.init();
app.init();
