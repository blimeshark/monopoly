const GameActions = {
    NO_ACTION: 0,
    PAY_PLAYER: 1,
    PAY_BANK: 2,
    PURCHASE_OFFER: 3
}

const numStations = 4;


class GameManager {
    constructor(players, tiles) {
        this.players = players;
        this.tiles = tiles;
    }

    returnPropertyActions(playerIndex, tileIndex) {
        var state = this.tiles[tileIndex].state;

        if (state['owner'] == playerIndex)
        {
            return {'action': GameActions.NO_ACTION};
        }

        else if (state['owner'] == invalidOwnerIndex)
        {
            return {'action': GameActions.PURCHASE_OFFER, 'price': state['price'], 'toPlayer': playerIndex};
        }

        else
        {
            var rentPrice = 0;

            if (state['hotel'] === true)
            {
                rentPrice = this.tiles[tileIndex].deedCost['rentHotel'];
                return {'action': GameActions.PAY_PLAYER, 'player': state['owner'], 'amount': rentPrice, 'toPlayer': playerIndex};
            }

            else
            {
                switch (state['houses']) {
                    case 4:
                        rentPrice = this.tiles[tileIndex].deedCost['rentFour'];
                        break;
                    case 3:
                        rentPrice = this.tiles[tileIndex].deedCost['rentTriple'];
                        break;
                    case 2:
                        rentPrice = this.tiles[tileIndex].deedCost['rentDouble'];
                        break;
                    case 1:
                        rentPrice = this.tiles[tileIndex].deedCost['rentSingle'];
                        break;
                    case 0:
                    default:
                        rentPrice = this.tiles[tileIndex].deedCost['rent'];
                }

                return {'action': GameActions.PAY_PLAYER, 'player': state['owner'], 'amount': rentPrice, 'toPlayer': playerIndex};
            }
        }
    }


    returnStationActions(playerIndex, tileIndex) {
        var state = this.tiles[tileIndex].state;
        var stationsList = [5, 15, 25, 35];
        var index = stationsList.indexOf(tileIndex);

        stationsList.splice(index, 1);

        if (state['owner'] == playerIndex)
        {
            return {'action': GameActions.NO_ACTION};
        }

        else if (state['owner'] != invalidOwnerIndex)
        {
            var stationsOwned = [];
            var rentPrice = 0;

            for (var i = 0; i < numStations - 1; i++)
            {
                if (this.tiles[stationsList[i]].state['owner'] == state['owner'])
                {
                    stationsOwned.push(stationsList[i]);
                }
            }

            switch (stationsOwned.length)
            {
                case 3:
                    rentPrice = 200;
                    break;
                case 2:
                    rentPrice = 100;
                    break;
                case 1:
                    rentPrice = 50;
                    break;
                case 0:
                default:
                    rentPrice = 25;
                    break;
            }

            return {'action': GameActions.PAY_PLAYER, 'player': state['owner'], 'amount': rentPrice};
        }

        else if (state['owner'] == invalidOwnerIndex)
        {
            return {'action': GameActions.PURCHASE_OFFER, 'price': state['price']};
        }
    }


    returnAction(playerIndex, tileIndex) {
        var tileType = this.tiles[tileIndex].type;
        var state = this.tiles[tileIndex].state;
        var actionObject;

        switch (tileType) {
            case BROWN_DD:
            case LTBLUE_DD:
            case PINK_DD:
            case ORANGE_DD:
            case RED_DD:
            case YELLOW_DD:
            case GREEN_DD:
            case BLUE_DD:
                actionObject = this.returnPropertyActions(playerIndex, tileIndex);
                break;
            case STATIONS:
                actionObject = this.returnStationActions(playerIndex, tileIndex);
                break;
            case FREE_PARKING:
            default:
                // No action for FREE_PARKING
        }
    }
}