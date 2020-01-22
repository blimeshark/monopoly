;
jQuery(function($){
    'use strict';

    function startSketch() {
        let tiles = [];
    
        function addNonCornerTiles(x, y, index, height, length, direction) {
            for (let i = 0; i < 9; i++)
            {
                let tile;
                switch(direction) {
                    case 0:
                        x = x - length;
                        tile = new Tile(x, y, length, height, index, index + 1);
                        break;
                    case 1:
                        y = y - length;
                        tile = new Tile(x, y, height, length, index, index + 1);
                        break;
                    case 2:
                        x = x + length;
                        tile = new Tile(x, y, length, height, index, index + 1);
                        break;
                    case 3:
                    default:
                        y = y + length;
                        tile = new Tile(x, y, height, length, index, index + 1);
                }
    
                tiles.push(tile);
                index++;
            }
        };
        function setupArrayOfTiles(len, halflen) {
            // Draw the big 4 tiles
            let goTile = new Tile(1050, 1050, len, len, 0, 1);
            let jailTile = new Tile(0, 1050, len, len, 10, 11);
            let freeParkingTile = new Tile(0, 0, len, len, 20, 21);
            let goToJailTile = new Tile(1050, 0, len, len, 30, 31);
    
            tiles.push(goTile);
            addNonCornerTiles(1050, 1050, goTile.index + 1, len, halflen, 0);
            tiles.push(jailTile);
            addNonCornerTiles(0, 1050, jailTile.index + 1, len, halflen, 1);
            tiles.push(freeParkingTile);
            addNonCornerTiles(50, 0, freeParkingTile.index + 1, len, halflen, 2);
            tiles.push(goToJailTile);
            addNonCornerTiles(1050, 50, goToJailTile.index + 1, len, halflen, 3);
        };
        var sketch = function(p) {
            setupArrayOfTiles(150, 100);

            p.preload = function() {
                p.myFont = p.loadFont('fonts/MONOPOLY_INLINE.ttf');
                p.imgTrain = p.loadImage('images/train.png');
                p.imgFreeParking = p.loadImage('images/free_park.png');
                p.imgGoToJail = p.loadImage('images/go_to_jail.png');
                p.imgChance = p.loadImage('images/chance.png');
                p.imgChest = p.loadImage('images/chest.png');
                p.imgSuperTax = p.loadImage('images/luxury_tax.png');
                p.imgIncomeTax = p.loadImage('images/diamond.png');
                p.imgGoArrow = p.loadImage('images/go_arrow.png');
                p.imgElecCompany = p.loadImage('images/bulb.png');
                p.imgWaterWorks = p.loadImage('images/tap.png');
                // imgInJail = loadImage('images/prison.jpg');
            };

            p.setup = function() {
                let canvasLen = 1200;
    
                p.pixelDensity(3.0);
                p.createCanvas(canvasLen, canvasLen);            
            };
            p.draw = function() {
                p.background(192, 226, 202);
                for (let tile of tiles) {
                    tile.show(p);
                }
            };
        }
    
    
        var myp5 = new p5(sketch);
    };

    var client = {
        init: function() {
            client.socket = io.connect();
            client.eventListenerInit();
        },

        // Add socket events to listen to, from client actions
        eventListenerInit: function() {
            client.socket.on('connected', client.onConnect);
            client.socket.on('newGame', client.onNewGame);
            client.socket.on('startGame', client.onStartGame);
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
        },

        onStartGame: function(data) {
            console.log('Player ' + data.username + ' called startGame. Update mainDisplay and all player screen');

            if (app.role == 1)
            {
                // Display the Monopoly board.
                app.host.showHostGameArea(data);
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
            app.$templateGameArea = $('#gamearea-screen-template').html();
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

            showHostGameArea: function(data) {
                app.$mainDisplay.html(app.$templateGameArea);
                startSketch();
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

            showPlayerGameArea: function(data) {
                console.log("do nothing");

            }

        },
    };

    client.init();
    app.init();

});