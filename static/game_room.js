;
jQuery(function($){
    'use strict';

    var client = {
        init: function() {
            client.socket = io.connect();
            client.eventListenerInit();
        },

        // Add socket events to listen to, from client actions
        eventListenerInit: function() {
            client.socket.on('connected', client.onConnect);
            client.socket.on('newGame', client.onNewGame);
            client.socket.on('playerJoinedGame', client.playerJoinedGame);

        },

        onConnect: function() {
            app.socketId = client.socket.id;
        },

        onNewGame: function(data) {
            app.host.gameInit(data);
        },

        /**
         * Callback to when player joins a game.
         * Update the Main display showing players who have joined.
         * Update the Plyaer screen showing 'Waiting for Players' message and
         * 'Start Game' button.
         */
        playerJoinedGame: function(data) {
            console.log('A player joined. Update the main and player display.');

            if ("errorMsg" in data)
            {

                app.player.showPlayerWaitingDisplay(data);
            }
            else
            {
                app.host.updateWaitingDisplay(data);
                app.player.showPlayerWaitingDisplay(data);
            }


        }
    };


    /**
     * Contains controls for Host and Player (screen) display
     */
    var app = {
        gameId: 0, // Room ID for a given game instance
        socketId: '', // The cached value of the socket.IO session ID
        role: 0, // 0 = Player, 1 = Host

        init: function() {
            app.initElements(); // Define display elements for the game
            app.initEvents(); // Define event callbacks when user interact with buttons
            app.showInitDisplay();

            FastClick.attach(document.body); // Initialise the fast-click library
        },

        initElements: function() {
            app.$doc = $(document);

            app.$mainDisplay = $('#mainDisplay'); // ID for main display of the game
            app.$templateIntro = $('#intro-screen-template').html();
            app.$templatePreGame = $('#pregame-screen-template').html();
            app.$templateJoinGame = $('#joingame-screen-template').html();
            app.$templateWaitForPlayers = $('#waitforplayers-screen-template').html();
        },

        /**
         * Bind button actions to events, eg create room, join room
         */
        initEvents: function() {
            app.$doc.on('click', '#btnNewGame', app.host.onNewGameClick);
            app.$doc.on('click', '#btnJoinGame', app.player.onJoinGameClick);
            app.$doc.on('click', '#btnEnterGame', app.player.onJoinExistingGameClick);
            app.$doc.on('click', '#btnStartGame', app.player.onStartGameClick);
        },

        showInitDisplay: function() {
            app.$mainDisplay.html(app.$templateIntro);
            app.fitText('.title')
        },

        fitText: function(element) {
            textFit(
                $(element)[0],
                {
                    alignHoriz:true,
                    alignVert:false,
                    widthOnly:true,
                    reProcess:true,
                    maxFontSize:300
                }
            );
        },


        host: {
            players: [],
            numPlayers: 0,

            gameInit: function(data) {
                app.gameId = data.gameId;
                app.socketId = data.socketId;
                app.role = 1;
                app.host.numPlayers = 0;

                app.host.showNewGameDisplay();
            },

            onNewGameClick: function () {
                client.socket.emit('hostNewGame');
            },

            showNewGameDisplay: function() {
                // Show the player join screen in the main display with the room ID
                app.$mainDisplay.html(app.$templatePreGame);
                $('#gameURL').text(window.location.href);
                app.fitText('#gameURL');
                $('#roomId').text(app.gameId);
            },

            /**
             * This function is called when a player joins a game.
             * It updates the Main display to show the players who have joined.
             */
            updateWaitingDisplay: function(data) {
                // TODO: Deal with case if new game restarted

                if (app.host.numPlayers < 6)
                {
                    //$('#playersInRoom').append('<p/>').text('Player ' + data.username + ' joined.');

                    var joinMsg = '<p>Player ' + data.username + ' joined.</p>';
                    $('#playersInRoom').append(joinMsg);

                    app.host.players.push(data);
                    app.host.numPlayers += 1;

                    // TODO: Maybe display a message if 6 players already that room is full.
                    console.log('numPlayers: ' + app.host.numPlayers);
                }

            },
        },

        player: {
            balance: 0,
            hostSocketId: '',
            username: '',

            onJoinGameClick: function () {
                app.$mainDisplay.html(app.$templateJoinGame);
            },


            onJoinExistingGameClick: function () {
                var data = {
                    gameId : +($('#inputGameId').val()),
                    username : $('#inputUsername').val() || 'anon'
                }

                // TODO: Check name is valid and game ID exists on server?

                client.socket.emit('playerJoined', data);

                app.role = 0;
                app.player.username = data.username;

            },

            onStartGameClick: function () {
                // app.gameId should be set at this point

                var data = {
                    gameId: app.gameId,
                    username: app.player.username,
                }

                client.socket.emit('playerStartGame', data);
            },

            /**
             * This function updates the Player's screen to show the
             * 'Waiting for Players' message and 'Start Game' button
             */
            showPlayerWaitingDisplay: function(data) {
                console.log("Socket ID: " + client.socket.id + " Cached Value: " + app.socketId);

                if ("errorMsg" in data)
                {
                    $('#joinGameError').append('<p/>').text('No game room found for given ID.');
                }
                else if (client.socket.id == data.socketId)
                {
                    app.role = 0;
                    app.gameId = data.gameId;

                    app.$mainDisplay.html(app.$templateWaitForPlayers);
                }

            },

        },
    };

    client.init();
    app.init();

});