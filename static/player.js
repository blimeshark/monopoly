class Player {
    constructor(username, initRollValue, socketId, playerToken) {
        this.username = username;
        this.spot = 0; // Tile index where player is
        this.destSpot = 0;
        this.cash = 5000;
        this.socketId = socketId;

        this.initRollValue = initRollValue;
        // this.token = playerToken;

        this.token = new Token(playerToken)

        this.playerTurn = false;

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
        let current = tiles[this.spot];
        let width = this.token.width;
        let height = this.token.height;
        let x = current.cx - (width / 2);;
        let y = current.cy - (height / 2);;
        let image = p.getTokenImage(this.token.tokenName);

        if (image == null)
        {
            return;
        }

        if (this.spot != this.destSpot)
        {       
            this.spot += 1;
            if (this.spot > 39)
            {
                this.spot = this.spot - 40;
            }
        }

        if (this.playerTurn)
        {
            p.image(image, x, y, width, height);
        }
        else
        {
            p.tint(255, 127);
            p.image(image, x, y, width, height);
            p.noTint();            
        }
    }
}