var tokenList = {};

tokenList['scottish_terrier'] = {'width': 50, 'height': 47};
tokenList['battleship'] = {'width': 50, 'height': 51};
tokenList['race_car'] = {'width': 50, 'height': 38};
tokenList['top_hat'] = {'width': 50, 'height': 36};
tokenList['penguin'] = {'width': 37, 'height': 50};
tokenList['t_rex'] = {'width': 50, 'height': 34};
tokenList['cat'] = {'width': 42, 'height': 52};
tokenList['rubber_ducky'] = {'width': 50, 'height': 46};


class Token {
	constructor(tokenString) {
		this.tokenName = tokenString;
		this.width = tokenList[this.tokenName]['width'];
		this.height = tokenList[this.tokenName]['height'];

		// Parameters for 50% opacity
		this.opFade1 = 255;
		this.opFade2 = 127;
	}
}