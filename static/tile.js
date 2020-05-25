const tileTypes = {
    BROWN_DD: 'brown_deed',
    LTBLUE_DD: 'lightblue_deed',
    PINK_DD: 'pink_deed',
    ORANGE_DD: 'orange_dd',
    RED_DD: 'red_dd',
    YELLOW_DD: 'yellow_dd',
    GREEN_DD: 'green_dd',
    BLUE_DD: 'blue_dd',
    UTILITY: 'utility',
    STATIONS: 'station',
    CM_CHEST: 'community_chest',
    CHANCE: 'chance',
    GO_TO_JAIL: 'go_to_jail',
    JAIL: 'jail',
    GO: 'go',
    FREE_PARKING: 'free_parking',
    SUPERTAX: 'supertax',
    INCOMETAX: 'incometax',
};

const invalidOwnerIndex = 6;

class Tile {
    constructor(x, y, width, height, index, next) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.next = next;
        this.width = width;
        this.height = height;

        this.purchasePrice = "";
        this.deedCost = {};  

        this.setCenter();
        this.getTileType();
        this.setTileState();
    }

    // this function is used to set the center coordinates
    // for the tokens
    setCenter() {
        this.cx = this.x + this.width / 2;
        this.cy = this.y + this.height / 2;
    }

    getCenter() {
        return [this.cx, this.cy];
    }

    setTileState() {
        this.state = {};
        this.state['owner'] = invalidOwnerIndex;
        this.state['mortgaged'] = false;
        this.state['houses'] = 0;
        this.state['hotel'] = false;
        this.state['price'] = 0;
    }

    getTileType() {
        switch(this.index) {
            case 1:
            case 3:
                this.type = tileTypes.BROWN_DD;
                this.propertyColor = [139, 69, 19];

                if (this.index == 1) {
                    this.name = "Old Kent Road";
                    this.nameArr = ["Old Kent", "Road"];
                    this.deedCost = {'rent': 2, 'rentColourSet': 4, 'rentSingle': 10, 'rentDouble': 30, 'rentTriple': 90, 'rentFour': 160, 'rentHotel': 250};
                } else if (this.index == 3) {
                    this.name = "WhiteChapel Road";
                    this.nameArr = ["Whitechapel", "Road"];
                    this.deedCost = {'rent': 4, 'rentColourSet': 8, 'rentSingle': 20, 'rentDouble': 60, 'rentTriple': 180, 'rentFour': 320, 'rentHotel': 450};
                }

                this.deedCost['houseCost'] = 50;
                this.deedCost['hotelCost'] = 50;
                this.purchasePrice = "$60";
                break;

            case 6:
            case 8:
            case 9:
                this.type = tileTypes.LTBLUE_DD;
                this.propertyColor = [135, 206, 235];
                if (this.index == 6) {
                    this.name = "The Angel, Islington";
                    this.nameArr = ["The Angel,", "Islington"];
                    this.deedCost = {'rent': 6, 'rentColourSet': 12, 'rentSingle': 30, 'rentDouble': 90, 'rentTriple': 270, 'rentFour': 400, 'rentHotel': 550};
                } else if (this.index == 8) {
                    this.name = "Euston Road";
                    this.nameArr = ["Euston", "Road"];
                    this.deedCost = {'rent': 6, 'rentColourSet': 12, 'rentSingle': 30, 'rentDouble': 90, 'rentTriple': 270, 'rentFour': 400, 'rentHotel': 550};
                } else {
                    this.name = "Pentonville Road";
                    this.nameArr = ["Pentonville", "Road"];
                    this.deedCost = {'rent': 8, 'rentColourSet': 16, 'rentSingle': 40, 'rentDouble': 100, 'rentTriple': 300, 'rentFour': 450, 'rentHotel': 600};
                }

                this.deedCost['houseCost'] = 50;
                this.deedCost['hotelCost'] = 50;
                this.purchasePrice = (this.index == 9) ? "$120" : "$100";
                break;

            case 11:
            case 13:
            case 14:
                this.type = tileTypes.PINK_DD;
                this.propertyColor = [153, 50, 204];
                if (this.index == 11) {
                    this.name = "Pall Mall";
                    this.nameArr = ["Pall", "Mall"];
                    this.deedCost = {'rent': 10, 'rentColourSet': 20, 'rentSingle': 50, 'rentDouble': 150, 'rentTriple': 450, 'rentFour': 625, 'rentHotel': 750};
                } else if (this.index == 13) {
                    this.name = "Whitehall";
                    this.nameArr = ["Whitehall", ""];
                    this.deedCost = {'rent': 10, 'rentColourSet': 20, 'rentSingle': 50, 'rentDouble': 150, 'rentTriple': 450, 'rentFour': 625, 'rentHotel': 750};
                } else {
                    this.name = "Northumberland Avenue";
                    this.nameArr= ["North'mberland", "Avenue"];
                    this.deedCost = {'rent': 12, 'rentColourSet': 24, 'rentSingle': 60, 'rentDouble': 180, 'rentTriple': 500, 'rentFour': 700, 'rentHotel': 900};
                }

                this.deedCost['houseCost'] = 100;
                this.deedCost['hotelCost'] = 100;
                this.purchasePrice = (this.index == 14) ? "$160" : "$140";
                break;

            case 16:
            case 18:
            case 19:
                this.type = tileTypes.ORANGE_DD;
                this.propertyColor = [255, 165, 0];
                if (this.index == 16) {
                    this.name = "Bow Street";
                    this.nameArr = ["Bow", "Street"];
                    this.deedCost = {'rent': 14, 'rentColourSet': 28, 'rentSingle': 70, 'rentDouble': 200, 'rentTriple': 550, 'rentFour': 750, 'rentHotel': 950};
                } else if (this.index == 18) {
                    this.name = "Marlborough Street";
                    this.nameArr = ["Marlborough", "Street"];
                    this.deedCost = {'rent': 14, 'rentColourSet': 28, 'rentSingle': 70, 'rentDouble': 200, 'rentTriple': 550, 'rentFour': 750, 'rentHotel': 950};
                } else {
                    this.name = "Vine Street";
                    this.nameArr = ["Vine", "Street"];
                    this.deedCost = {'rent': 16, 'rentColourSet': 32, 'rentSingle': 80, 'rentDouble': 220, 'rentTriple': 600, 'rentFour': 800, 'rentHotel': 1000};
                }

                this.deedCost['houseCost'] = 100;
                this.deedCost['hotelCost'] = 100;
                this.purchasePrice = (this.index == 19) ? "$200" : "$180";
                break;

            case 21:
            case 23:
            case 24:
                this.type = tileTypes.RED_DD;
                this.propertyColor = [255, 0, 0];
                if (this.index == 21) {
                    this.name = "Strand";
                    this.nameArr = ["Strand", ""];
                    this.deedCost = {'rent': 18, 'rentColourSet': 36, 'rentSingle': 90, 'rentDouble': 250, 'rentTriple': 700, 'rentFour': 875, 'rentHotel': 1050};
                } else if (this.index == 23) {
                    this.name = "Fleet Street";
                    this.nameArr = ["Fleet", "Street"];
                    this.deedCost = {'rent': 18, 'rentColourSet': 36, 'rentSingle': 90, 'rentDouble': 250, 'rentTriple': 700, 'rentFour': 875, 'rentHotel': 1050};
                } else {
                    this.name = "Trafalgar Street";
                    this.nameArr = ["Trafalgar", "Street"];
                    this.deedCost = {'rent': 20, 'rentColourSet': 40, 'rentSingle': 100, 'rentDouble': 300, 'rentTriple': 750, 'rentFour': 925, 'rentHotel': 1100};
                }

                this.deedCost['houseCost'] = 150;
                this.deedCost['hotelCost'] = 150;
                this.purchasePrice = (this.index == 24) ? "$240" : "$220";
                break;

            case 26:
            case 27:
            case 29:
                this.type = tileTypes.YELLOW_DD;
                this.propertyColor = [255, 255, 0];
                if (this.index == 26) {
                    this.name = "Leicester Square";
                    this.nameArr = ["Leicester", "Square"];
                    this.deedCost = {'rent': 22, 'rentColourSet': 44, 'rentSingle': 110, 'rentDouble': 330, 'rentTriple': 800, 'rentFour': 975, 'rentHotel': 1150};
                } else if (this.index == 27) {
                    this.name = "Coventry Street";
                    this.nameArr = ["Coventry", "Street"];
                    this.deedCost = {'rent': 22, 'rentColourSet': 44, 'rentSingle': 110, 'rentDouble': 330, 'rentTriple': 800, 'rentFour': 975, 'rentHotel': 1150};
                } else {
                    this.name = "Picadilly";
                    this.nameArr = ["Picadilly", ""];
                    this.deedCost = {'rent': 24, 'rentColourSet': 48, 'rentSingle': 120, 'rentDouble': 360, 'rentTriple': 850, 'rentFour': 1025, 'rentHotel': 1200};
                }

                this.deedCost['houseCost'] = 150;
                this.deedCost['hotelCost'] = 150;
                this.purchasePrice = (this.index == 29) ? "$280" : "$260";
                break;

            case 31:
            case 32:
            case 34:
                this.type = tileTypes.GREEN_DD;
                this.propertyColor = [0, 128, 0];
                if (this.index == 31) {
                    this.name = "Regent Street";
                    this.nameArr = ["Regent", "Street"];
                    this.deedCost = {'rent': 26, 'rentColourSet': 52, 'rentSingle': 130, 'rentDouble': 390, 'rentTriple': 900, 'rentFour': 1100, 'rentHotel': 1275};
                } else if (this.index == 32) {
                    this.name = "Oxford Street";
                    this.nameArr = ["Oxford", "Street"];
                    this.deedCost = {'rent': 26, 'rentColourSet': 52, 'rentSingle': 130, 'rentDouble': 390, 'rentTriple': 900, 'rentFour': 1100, 'rentHotel': 1275};
                } else {
                    this.name = "Bond Street";
                    this.nameArr = ["Bond", "Street"];
                    this.deedCost = {'rent': 28, 'rentColourSet': 56, 'rentSingle': 150, 'rentDouble': 450, 'rentTriple': 1000, 'rentFour': 1200, 'rentHotel': 1400};
                }

                this.deedCost['houseCost'] = 200;
                this.deedCost['hotelCost'] = 200;
                this.purchasePrice = (this.index == 34) ? "$320" : "$300";
                break;

            case 37:
            case 39:
                this.type = tileTypes.BLUE_DD;
                this.propertyColor = [0, 0, 139];

                if (this.index == 37) {
                    this.name = "Park Lane";
                    this.nameArr = ["Park", "Lane"];
                    this.deedCost = {'rent': 35, 'rentColourSet': 70, 'rentSingle': 175, 'rentDouble': 500, 'rentTriple': 1100, 'rentFour': 1300, 'rentHotel': 1500};
                }
                else if (this.index == 39) {
                    this.name = "Mayfair";
                    this.nameArr = ["Mayfair", ""];
                    this.deedCost = {'rent': 50, 'rentColourSet': 100, 'rentSingle': 200, 'rentDouble': 600, 'rentTriple': 1400, 'rentFour': 1700, 'rentHotel': 2000};
                }

                this.deedCost['houseCost'] = 200;
                this.deedCost['hotelCost'] = 200;
                this.purchasePrice = (this.index == 39) ? "$400" : "$350";
                break;

            case 5:
            case 15:
            case 25:
            case 35:
                this.type = tileTypes.STATIONS;
                if (this.index == 5) {
                    this.name = "Kings Cross Station";
                } else if (this.index == 15) {
                    this.name = "Marylebone Station";
                } else if (this.index == 25) {
                    this.name = "Fenchurch St. Station";
                } else {
                    this.name = "Liverpool St. Station";
                }

                this.deedCost = {'rent': 25, 'twoStation': 50, 'threeStation': 100, 'allStations': 200};
                this.purchasePrice = "$200";
                break;

            case 12:
            case 28:
                this.type = tileTypes.UTILITY;
                this.name = (this.index == 12) ? "Electric Company" : "Water Works";
                this.purchasePrice = "$150";
                this.deedCost = {'defaultMultiplier': 4, 'allMultiplier': 10};
                break;

            case 2:
            case 17:
            case 33:
                this.type = tileTypes.CM_CHEST;
                this.name = "Community Chest";
                break;

            case 7:
            case 22:
            case 36:
                this.type = tileTypes.CHANCE;
                this.name = "Chance";
                break;

            case 0:
                this.type = tileTypes.GO;
                this.name = "Go";
                break;
            case 4:
                this.type = tileTypes.INCOMETAX;
                this.name = 'Income Tax';
                this.cost = "$200";
                break;
            case 10:
                this.type = tileTypes.JAIL;
                this.name = "Jail";
                break;
            case 20:
                this.type = tileTypes.FREE_PARKING;
                this.name = "Free Parking";
                break;
            case 30:
                this.type = tileTypes.GO_TO_JAIL;
                this.name = "Go To Jail";
                break;
            case 38:
                this.type = tileTypes.SUPERTAX;
                this.name = "Super Tax";
                this.cost = "$100";
                break;

        }
    }

    isTileTypeProperty() {
        switch(this.type) {
            case tileTypes.BROWN_DD:
            case tileTypes.LTBLUE_DD:
            case tileTypes.PINK_DD:
            case tileTypes.ORANGE_DD:
            case tileTypes.RED_DD:
            case tileTypes.YELLOW_DD:
            case tileTypes.GREEN_DD:
            case tileTypes.BLUE_DD:
                return true;
            default:
                return false;
        }
    }

    fillPropertyColor(p) {
        switch (this.type) {
            case tileTypes.BROWN_DD:
            case tileTypes.LTBLUE_DD:
            case tileTypes.RED_DD:
            case tileTypes.YELLOW_DD:           
                p.fill(this.propertyColor[0], this.propertyColor[1], this.propertyColor[2]);        
                p.rect(this.x, this.y, this.width, 40);
                p.fill(192, 226, 202);
                p.rect(this.x, this.y + 40, this.width, 110);

                p.fill(0, 0, 0);
                p.textFont(p.myFont);
                p.textSize(13);
                p.textAlign(p.CENTER, p.CENTER);

                // Property name
                p.text(this.nameArr[0].toUpperCase(), this.x + 50, this.y + 60);
                p.text(this.nameArr[1].toUpperCase(), this.x + 50, this.y + 70);

                // Purchase Price
                p.text(this.purchasePrice, this.x + 50, this.y + 135);

                break;
            case tileTypes.ORANGE_DD:
            case tileTypes.PINK_DD:
                p.fill(192, 226, 202);
                p.rect(this.x, this.y, this.width - 40, this.height);               
                p.fill(this.propertyColor[0], this.propertyColor[1], this.propertyColor[2]);        
                p.rect(this.x + 110, this.y, 40, this.height);

                p.push();
                p.fill(0, 0, 0);
                p.textFont(p.myFont);
                p.textSize(13);
                p.textAlign(p.CENTER, p.CENTER);
                p.rotate(p.HALF_PI);
                p.text(this.nameArr[0].toUpperCase(), this.y + 50, this.x - 90);
                p.text(this.nameArr[1].toUpperCase(), this.y + 50, this.x - 80);

                p.text(this.purchasePrice, this.y + 50, this.x - 15);
                p.pop();


                break;
            case tileTypes.GREEN_DD:
            case tileTypes.BLUE_DD:
                p.fill(this.propertyColor[0], this.propertyColor[1], this.propertyColor[2]);        
                p.rect(this.x, this.y, 40, this.height);
                p.fill(192, 226, 202);
                p.rect(this.x + 40, this.y, this.width - 40, this.height);

                p.push();
                p.fill(0, 0, 0);
                p.textFont(p.myFont);
                p.textSize(13);
                p.textAlign(p.CENTER, p.CENTER);
                p.rotate(-1 * p.HALF_PI);
                p.text(this.nameArr[0].toUpperCase(), -1 * this.y - 50, this.x + 60);
                p.text(this.nameArr[1].toUpperCase(), -1 * this.y - 50, this.x + 70);

                p.text(this.purchasePrice, -1 * this.y - 50, this.x + 135);
                p.pop();

            default:
                break;

        }
    }

    fillTileAsStation(p) {      
        p.fill(192, 226, 202);
        p.rect(this.x, this.y, this.width, this.height);

        p.fill(0, 0, 0);
        p.textFont(p.myFont);
        p.textSize(14);
        p.textAlign(p.CENTER, p.CENTER);

        if (this.index == 5 || this.index == 25) {
            if (this.index == 5) {
                p.text("Kings Cross".toUpperCase(), this.x + 50, this.y + 15);
            }

            if (this.index == 25) {
                p.text("Fenchurch St.".toUpperCase(), this.x + 50, this.y + 15);
            }

            p.text("STATION".toUpperCase(), this.x + 50, this.y + 25);

            p.image(p.imgTrain, this.x + 15, this.y + 55, 70, 70);
            p.text(this.purchasePrice, this.x + 50, this.y + 135);
        }

        if (this.index == 15) {
            p.push();
            p.rotate(p.HALF_PI);
            p.text("MARYLEBONE", this.y + 50, this.x - 135);
            p.text("STATION", this.y + 50, this.x - 125);
            p.image(p.imgTrain, this.y + 15, this.x - 95, 70, 70);
            p.text(this.purchasePrice, this.y + 50, this.x - 15);
            p.pop();
        }

        if (this.index == 35) {
            p.push();
            p.rotate(-1 * p.HALF_PI);
            p.text("LIVERPOOL ST.", -1 * this.y - 50, this.x + 15);
            p.text("STATION", -1 * this.y - 50, this.x + 25);
            p.image(p.imgTrain, -1 * this.y - 85, this.x + 55, 70, 70);
            p.text(this.purchasePrice, -1 * this.y - 50, this.x + 135);
            p.pop();
        }

    }

    fillTileAsUtility(p) {
        p.fill(192, 226, 202);
        p.rect(this.x, this.y, this.width, this.height);

        p.fill(0, 0, 0);
        p.textFont(p.myFont);
        p.textSize(14);

        if (this.name == "Water Works") {
            p.textAlign(p.CENTER, p.CENTER);
            p.text("WATER", this.x + 50, this.y + 15);
            p.text("WORKS", this.x + 50, this.y + 25);
            p.image(p.imgWaterWorks, this.x + 15, this.y + 55, 70, 70);
            p.text(this.purchasePrice, this.x + 50, this.y + 135);
        }

        if (this.name == "Electric Company") {
            p.push();
            p.textAlign(p.CENTER, p.CENTER);
            p.rotate(p.HALF_PI);
            p.text("ELECTRIC", this.y + 50, this.x - 135);
            p.text("COMPANY", this.y + 50, this.x - 125);
            p.image(p.imgElecCompany, this.y + 15, this.x - 95, 70, 70);
            p.text(this.purchasePrice, this.y + 50, this.x - 15);
            p.pop();
        }


    }

    fillTaxTile(p) {
        p.fill(192, 226, 202);
        p.rect(this.x, this.y, this.width, this.height);

        p.fill(0, 0, 0);
        p.textFont(p.myFont);
        p.textSize(14);

        if (this.index == 38) {
            p.push();
            p.rotate(-1 * p.HALF_PI);
            p.text("LUXURY", -1 * this.y - 50, this.x + 15);
            p.text("TAX", -1 * this.y - 50, this.x + 25);
            p.image(p.imgSuperTax, -1 * this.y - 85, this.x + 55, 70, 70);
            p.text(this.cost, -1 * this.y - 50, this.x + 135);          
            p.pop();
        }

        if (this.index == 4) {
            p.textSize(14);
            p.textAlign(p.CENTER, p.CENTER);
            p.text("INCOME", this.x + 50, this.y + 15);
            p.text("TAX", this.x + 50, this.y + 25);
            p.image(p.imgIncomeTax, this.x + 15, this.y + 55, 70, 70);
            p.text(this.cost, this.x + 50, this.y + 135);
        }

    }


    fillTileNoPrice(p) {
        p.fill(192, 226, 202);
        p.rect(this.x, this.y, this.width, this.height);

        p.fill(0, 0, 0);
        p.textFont(p.myFont);


        if (this.index == 0) {
            p.textSize(16);
            p.textAlign(p.CENTER, p.CENTER);
            p.text("COLLECT $200", this.x + 75, this.y + 15);
            p.text("WHEN YOU PASS", this.x + 75, this.y + 30);
            p.textSize(64);
            p.text("GO", this.x + 75, this.y + 75);

            p.image(p.imgGoArrow, this.x + 25, this.y + 120, 100, 20);


        }

        if (this.index == 10) {
            p.fill(255, 165, 0);        
            p.rect(this.x + 40, this.y, 110, 110);

            p.fill(0, 0, 0);
            p.textSize(16);
            p.text("IN JAIL", this.x + 95, this.y + 15);

            // image(imgInJail, this.x + 60, this.y + 30, 70, 70);

            p.text("JUST VISITING", this.x + 75, this.y + 130);

        }

        if (this.index == 20) {
            p.textSize(16);
            p.textAlign(p.CENTER, p.CENTER);
            p.text("FREE", this.x + 75, this.y + 15);
            p.text("PARKING", this.x + 75, this.y + 30);
            p.image(p.imgFreeParking, this.x + 35, this.y + 45, 80, 80);
        }

        if (this.index == 30) {
            p.textSize(16);
            p.textAlign(p.CENTER, p.CENTER);
            p.text("GO TO", this.x + 75, this.y + 15);
            p.text("JAIL", this.x + 75, this.y + 30);
            p.image(p.imgGoToJail, this.x + 35, this.y + 45, 80, 80);           
        }

        // Chance card no rotation
        if (this.index == 7 || this.index == 22) {
            p.textSize(14);
            p.textAlign(p.CENTER, p.CENTER);
            p.text("CHANCE", this.x + 50, this.y + 15);
            p.image(p.imgChance, this.x + 15, this.y + 55, 70, 70);
        }

        // Chance card with rotation
        if (this.index == 36) {
            p.textSize(14);
            p.textAlign(p.CENTER, p.CENTER);
            p.push();
            p.rotate(-1 * p.HALF_PI);
            p.text("CHANCE", -1 * this.y - 50, this.x + 15);
            p.image(p.imgChance, -1 * this.y - 85, this.x + 55, 70, 70);
            p.pop();
        }

        // Community Chest card, no rotation
        if (this.index == 2) {
            p.textSize(14);
            p.textAlign(p.CENTER, p.CENTER);
            p.text("COMMUNITY", this.x + 50, this.y + 15);
            p.text("CHEST", this.x + 50, this.y + 25);
            p.image(p.imgChest, this.x + 15, this.y + 55, 70, 70);
        }

        // Community chest card, 1/2 PI rotation
        if (this.index == 17) {
            p.textSize(14);
            p.textAlign(p.CENTER, p.CENTER);
            p.push();
            p.rotate(p.HALF_PI);
            p.text("COMMUNITY", this.y + 50, this.x - 135);
            p.text("CHEST", this.y + 50, this.x - 125);
            p.image(p.imgChest, this.y + 15, this.x - 95, 70, 70);
            p.pop();
        }

        if (this.index == 33) {
            p.textSize(14);
            p.textAlign(p.CENTER, p.CENTER);
            p.push();
            p.rotate(-1 * p.HALF_PI);
            p.text("COMMUNITY", -1 * this.y - 50, this.x + 15);
            p.text("CHEST", -1 * this.y - 50, this.x + 25);
            p.image(p.imgChest, -1 * this.y - 85, this.x + 55, 70, 70);
            p.pop();            
        }
    }


    drawDeed(p) {
        var strokeThickness = 2;
        var trapezoidHeight = 20;

        // Total width: 100
        var offsetLeft = 35;
        var offsetRight = 65;


        switch (this.index)
        {
            case 1:
            case 3:
            case 5:
            case 6:
            case 8:
            case 9:
                p.beginShape();
                p.fill(255, 204, 0);
                p.strokeWeight(1);
                p.vertex(this.x, this.y - strokeThickness);
                p.vertex(this.x + 100, this.y - strokeThickness);
                p.vertex(this.x + offsetRight, this.y - (strokeThickness + trapezoidHeight));
                p.vertex(this.x + offsetLeft, this.y - (strokeThickness + trapezoidHeight));
                p.endShape(p.CLOSE);

                // Revert back to defaults after drawing
                p.strokeWeight(3);

                break;
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 18:
            case 19:
                p.beginShape();
                p.fill(255, 204, 0);
                p.strokeWeight(1);
                p.vertex(this.x + 150 + strokeThickness, this.y);
                p.vertex(this.x + 150 + strokeThickness, this.y + 100);
                p.vertex(this.x + 170 + strokeThickness, this.y + offsetRight);
                p.vertex(this.x + 170 + strokeThickness, this.y + offsetLeft);
                p.endShape(p.CLOSE);
                p.strokeWeight(3);
                break;
            case 21:
            case 23:
            case 24:
            case 25:
            case 26:
            case 27:
            case 28:
            case 29:
                p.beginShape();
                p.fill(255, 204, 0);
                p.strokeWeight(1);
                p.vertex(this.x, this.y + 150 + strokeThickness);
                p.vertex(this.x + 100, this.y + 150 + strokeThickness);
                p.vertex(this.x + 65, this.y + 150 + trapezoidHeight);
                p.vertex(this.x + 35, this.y + 150 + trapezoidHeight);
                p.endShape(p.CLOSE);
                p.strokeWeight(3);
                break;
            case 31:
            case 32:
            case 34:
            case 35:
            case 37:
            case 39:
                p.beginShape();
                p.fill(255, 204, 0);
                p.strokeWeight(1);
                p.vertex(this.x - strokeThickness, this.y);
                p.vertex(this.x - strokeThickness, this.y + 100);
                p.vertex(this.x - (trapezoidHeight + strokeThickness), this.y + offsetRight);
                p.vertex(this.x - (trapezoidHeight + strokeThickness), this.y + offsetLeft);
                p.endShape(p.CLOSE);
                p.strokeWeight(3);
                break;
            default:
                break;
        }
    }


    show(p) {
        p.strokeWeight(3);
        //rect(this.x, this.y, this.width, this.height);

        if (this.isTileTypeProperty())
        {
            this.fillPropertyColor(p);
        }
        else if (this.type == tileTypes.UTILITY)
        {
            this.fillTileAsUtility(p);
        }
        else if (this.type == tileTypes.STATIONS)
        {
            this.fillTileAsStation(p);
        }
        else if (this.type == tileTypes.INCOMETAX || this.type == tileTypes.SUPERTAX)
        {
            this.fillTaxTile(p);
        }
        else
        {
            //fill(192, 226, 202);
            //rect(this.x, this.y, this.width, this.height);
            this.fillTileNoPrice(p);
        }


        //fill(150);
        //textSize(16);
        //text(this.index + '->' + this.next, this.x, this.y + this.height);
    }
}