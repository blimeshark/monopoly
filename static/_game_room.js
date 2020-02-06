var diceSketch = function(p) {

    var diceSize = 117;
    var s1 = 0;
    var s2 = 0;
    var attempts = 0;
    var roll1 = 0;


    // Offsets for dice
    var d1Offset = 100;
    var d2Offset = (diceSize * 3) - d1Offset;

    p.setup = function() {
        p.frameRate(10);
        var myCanvas = p.createCanvas(diceSize*3, diceSize*2);
        myCanvas.parent("diceSketch");

        p.noLoop();
    };

    p.draw = function() {
        if (attempts == 20)
        {
            return;
        }

        p.background('#43936B');

        // dice
        p.noStroke();
        p.fill('#FFF3D6');
        p.rectMode(p.CENTER);
        //p.rect(p.width/2, p.height/2, diceSize, diceSize, diceSize/5);

        // Draw first dice
        p.rect(d1Offset, p.height/2, diceSize, diceSize, diceSize/5);
        p.rect(d2Offset, p.height/2, diceSize, diceSize, diceSize/5);

        // dots
        p.fill(50);

        s1 = Math.floor(Math.random() * 6) + 1;
        s2 = Math.floor(Math.random() * 6) + 1;

        //console.log("init: s1 " + s1 + " s2 " + s2);

        if (s1 == 1 || s1 == 3 || s1 == 5)
        {
            //console.log("a s1: " + s1 + " s2: " + s2);
            // First dice
            p.ellipse(d1Offset, p.height/2, diceSize/5, diceSize/5);
        }

        if (s2 == 1 || s2 == 3 || s2 == 5)
        {
            //console.log("b s1: " + s1 + " s2: " + s2);
            // Second dice
            p.ellipse(d2Offset, p.height/2, diceSize/5, diceSize/5);
        }

        if (s1 == 2 || s1 == 3 || s1 == 4 || s1 == 5 || s1 == 6)
        {
            //console.log("c s1: " + s1 + " s2: " + s2);
            // First dice
            p.ellipse(d1Offset - diceSize/4, p.height/2 - diceSize/4, diceSize/5, diceSize/5);
            p.ellipse(d1Offset + diceSize/4, p.height/2 + diceSize/4, diceSize/5, diceSize/5);
        }

        if (s2 == 2 || s2 == 3 || s2 == 4 || s2 == 5 || s2 == 6)
        {
            //console.log("d s1: " + s1 + " s2: " + s2);
            // Second dice
            p.ellipse(d2Offset - diceSize/4, p.height/2 - diceSize/4, diceSize/5, diceSize/5);
            p.ellipse(d2Offset + diceSize/4, p.height/2 + diceSize/4, diceSize/5, diceSize/5);
        }

        if (s1 == 4 || s1 == 5 || s1 == 6)
        {
            //console.log("e s1: " + s1 + " s2: " + s2);
            // First dice
            p.ellipse(d1Offset - diceSize/4, p.height/2 + diceSize/4, diceSize/5, diceSize/5);
            p.ellipse(d1Offset + diceSize/4, p.height/2 - diceSize/4, diceSize/5, diceSize/5);
        }

        if (s2 == 4 || s2 == 5 || s2 == 6)
        {
            //console.log("f s1: " + s1 + " s2: " + s2);
            // Second dice
            p.ellipse(d2Offset - diceSize/4, p.height/2 + diceSize/4, diceSize/5, diceSize/5);
            p.ellipse(d2Offset + diceSize/4, p.height/2 - diceSize/4, diceSize/5, diceSize/5);
        }

        if (s1 == 6)
        {
            //console.log("g s1: " + s1 + " s2: " + s2);
            // First die
            p.ellipse(d1Offset, p.height/2 - diceSize/4, diceSize/5, diceSize/5);
            p.ellipse(d1Offset, p.height/2 + diceSize/4, diceSize/5, diceSize/5);
        }

        if (s2 == 6)
        {
            //console.log("h s1: " + s1 + " s2: " + s2);
            // Second die
            p.ellipse(d2Offset, p.height/2 - diceSize/4, diceSize/5, diceSize/5);
            p.ellipse(d2Offset, p.height/2 + diceSize/4, diceSize/5, diceSize/5);
        }

        attempts += 1;

        if (attempts == 20)
        {
            //console.log("attempts " + attempts + " s1: " + s1 + " s2: " + s2);
            roll1 = s1;
            roll2 = s2;
            p.noLoop();
        }

        // roll
        //if (p.mouseIsPressed && p.mouseButton === p.LEFT)
        //{
        //    p.noLoop();
        //}
    };

    p.customStart = function() {
        attempts = 0;
        p.loop();
    }

    p.getRollValue = function() {
        var data = {
            r1: roll1,
            r2: roll2,
        }

        return data;
    }

    p.mousePressed = function() {



        //p.loop();
        //setTimeout(p.noLoop(), 5000);
    };

    document.oncontextmenu = function() {
        return true;
    }


}


function startSketch(players) {
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

            for (let player of players) {
                player.show(p, tiles);
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

    eventListenerInit: function() {
        client.socket.on('connected', client.onConnect);
        client.socket.on('newGame', client.onNewGame);
        client.socket.on('startGame', client.onStartGame);
        client.socket.on('rollDice', client.onPlayerRollDice);
        client.socket.on('playerJoinedGame', client.playerJoinedGame);        
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
        // console.log('A player joined. Update the main and player display.');
        if ("errorMsg" in data)
        {
            // TODO: Update this callback for errorMsg string display
            app.player.showPlayerWaitingDisplay(data);
        }
        else
        {
            app.host.updateWaitingDisplay(data);
            app.player.showPlayerWaitingDisplay(data);
        }
    },

    onStartGame: function(data) {
        // console.log('Player ' + data.username + ' called startGame. Update mainDisplay and all player screen');

        if (app.role == 1)
        {
            //console.log('numPlayers: ' + app.host.players.length);
            // Display the Monopoly board.
            app.host.showHostGameArea(data);
        }

        if (app.role == 0)
        {
            // Display the Player Game screen
            app.player.showPlayerScreen(data);
        }
    },

    onPlayerRollDice: function(data) {
        // TODO: What happens when r1 == r2 during a game dice roll.

        if (app.role == 1)
        {
            console.log('Received dice roll from player: ' + data.username + " value: " + data.roll1 + " " + data.roll2);

            let player;
            for (player of app.host.players)
            {
                // TODO: Implement no 2 players can have the same username in a game.
                if (player.username == data.username)
                {
                    player.spot += (data.roll1 + data.roll2);
                    if (player.spot > 39)
                    {
                        player.spot = player.spot - 40;
                    }
                }
            }
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

    /** Dice-roll related utility functions **/
    getRandomNumber: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    toggleClasses: function(die, s, num) {
        if (num == 1)
        {
            die.classList.toggle("odd-roll");
            die.classList.toggle("even-roll");
        }
        else
        {
            die.classList.toggle("odd-roll2");
            die.classList.toggle("even-roll2");
        }

        setTimeout(() => {for (let i = 1; i <= 6; i++){
            if (i == die.dataset.roll){
                continue;
            } else {
                s[i - 1].classList.add("hide-side");
            }}
        }, 1150)
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

                var p = new Player(data.username);

                app.host.players.push(p);
                app.host.numPlayers += 1;

                // TODO: Display an error message if 6 players already that room is full.
                // console.log('numPlayers: ' + app.host.numPlayers);
            }
        },

        showHostGameArea: function(data) {
            document.getElementById("mainDisplay").innerHTML = app.$templateGameArea;
            startSketch(app.host.players);
        },
    },


    player: {
        balance: 0,
        hostSocketId: '',
        username: '',
        diceSketch: null,
        initRollAttempts: 2, // Number of attempts to roll dice at the start of the game

        onJoinGameClick: function() {
            document.getElementById("mainDisplay").innerHTML = app.$templateJoinGame;

            app.player.diceSketch = new p5(diceSketch);
        },

        onJoinExistingGameClick: function() {
            var data = {
                gameId: document.getElementById("inputGameId").value,
                username: document.getElementById("inputUsername").value,
            }

            // TODO: Check name is valid and game ID exists on server.

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
        },

        onRollDiceInitClick: function() {         
            var data;

            // TODO: WIP
            // Pass roll values to game to determine turns
            // Resolve same value rolls.

            if (app.player.initRollAttempts == 0)
            {
                document.getElementById("joinGameError").innerHTML = "Exceeded dice roll attempts.";
                document.activeElement.blur();
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

        /**
         * This function updates the Player's screen to show the
         * 'Waiting for Players' message and 'Start Game' button.
         */
        showPlayerWaitingDisplay: function(data) {
            console.log("Socket ID: " + client.socket.id + " Cached Value: " + app.socketId);

            if ("errorMsg" in data)
            {
                // TODO: Check the error messages works.
                document.getElementById("joinGameError").innerHTML = "<p>No game room found for the given ID.</p>";
            }
            else if (client.socket.id == data.socketId)
            {
                app.role = 0;
                app.gameId = data.gameId;

                document.getElementById("mainDisplay").innerHTML = app.$templateWaitForPlayers;
            }
        },

        showPlayerScreen: function(data) {
            document.getElementById("mainDisplay").innerHTML = app.$templatePlayerScreen;
        },
    },
};

client.init();
app.init();