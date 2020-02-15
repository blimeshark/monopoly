class Player {
    constructor(username, initRollValue, socketId, playerToken) {
        this.username = username;
        this.spot = 0; // Tile index where player is
        this.destSpot = 0;
        this.cash = 5000;
        this.socketId = socketId;

        this.initRollValue = initRollValue;
        this.token = playerToken;

        // TODO: Allocate token correctly.
        //this.token = tokens[index];
    }

    move(spaces) {
        // TODO: Check spot is in correct index range of tiles.
        let nextSpot = this.destSpot + spaces;

        if (nextSpot > 39)
        {
            nextSpot = nextSpot - 40;
        }

        this.destSpot = nextSpot;
    }


    show(p, tiles) {
        //p.fill(255);
        let tempSpot = this.spot;
        if (this.spot != this.destSpot)
        {
            this.spot += 1;
            if (this.spot > 39)
            {
                this.spot = this.spot - 40;
            }
        }

        let current = tiles[this.spot];
        //let center = current.getCenter();
        let cx = current.x;
        let cy = current.y;
        //p.ellipse(center[0], center[1], 32, 32);

        switch(this.token) {
            case 'scottish_terrier':
                p.image(p.imgTokenTerrier, cx, cy, 50, 47);
                break;
            case 'battleship':
                p.image(p.imgTokenBattleShip, cx, cy, 50, 51);
                break;
            case 'race_car':
                p.image(p.imgTokenCar, cx, cy, 50, 38);
                break;
            case 'top_hat':
                p.image(p.imgTokenHat, cx, cy, 50, 36);
                break;
            case 'penguin':
                p.image(p.imgTokenPenguin, cx, cy, 37, 50);
                break;
            case 't_rex':
                p.image(p.imgTokenRex, cx, cy, 50, 34);
                break;
            case 'cat':
                p.image(p.imgTokenCat, cx, cy, 42, 52);
                break;
            case 'rubber_ducky':
                p.image(p.imgTokenDucky, cx, cy, 50, 46);
                break;
            default:
        }
    }
}