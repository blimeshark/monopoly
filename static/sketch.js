var diceSketch = function(p) {
    var diceSize = 117;
    var s1 = 0;
    var s2 = 0;
    var attempts = 0;
    var roll1 = 0;
    var roll2 = 0;

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

    };

    document.oncontextmenu = function() {
        return true;
    }
}

var gameAreaSketch = function(p) {
    p.tiles = [];
    p.players = [];


    p.addNonCornerTiles = function(x, y, index, height, length, direction) {
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

            p.tiles.push(tile);
            index++;
        }
    };

    p.setupArrayOfTiles = function(len, halflen) {
        // Draw the big 4 tiles
        let goTile = new Tile(1050, 1050, len, len, 0, 1);
        let jailTile = new Tile(0, 1050, len, len, 10, 11);
        let freeParkingTile = new Tile(0, 0, len, len, 20, 21);
        let goToJailTile = new Tile(1050, 0, len, len, 30, 31);

        p.tiles.push(goTile);
        p.addNonCornerTiles(1050, 1050, goTile.index + 1, len, halflen, 0);
        p.tiles.push(jailTile);
        p.addNonCornerTiles(0, 1050, jailTile.index + 1, len, halflen, 1);
        p.tiles.push(freeParkingTile);
        p.addNonCornerTiles(50, 0, freeParkingTile.index + 1, len, halflen, 2);
        p.tiles.push(goToJailTile);
        p.addNonCornerTiles(1050, 50, goToJailTile.index + 1, len, halflen, 3);
    };

    p.preload = function() {
        /* Preload function */
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

        p.imgTokenBattleship = p.loadImage('images/token_battleship.png');
        p.imgTokenCat = p.loadImage('images/token_cat.png');
        p.imgTokenDucky = p.loadImage('images/token_ducky.png');
        p.imgTokenPenguin = p.loadImage('images/token_penguin.png');
        p.imgTokenCar = p.loadImage('images/token_raceCar.png');
        p.imgTokenTerrier = p.loadImage('images/token_terrier.png');
        p.imgTokenHat = p.loadImage('images/token_tophat.png');
        p.imgTokenRex = p.loadImage('images/token_trex.png');

        p.setupArrayOfTiles(150, 100);
    };

    p.setup = function() {
        let canvasLen = 1200;

        p.frameRate(5);

        p.pixelDensity(3.0);
        p.createCanvas(canvasLen, canvasLen);
    };

    p.draw = function() {
        p.background(192, 226, 202);

        for (let tile of p.tiles) {
            tile.show(p);
        }

        for (let player of p.players) {
            player.show(p, p.tiles);
        }
    };
}
