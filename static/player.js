let tokens = ['battleship', 'race_car', 'top_hat', 'penguin', 't-rex', 'cat'];

class Player {
	constructor(username) {
		this.username = username;
		this.spot = 0; // Tile index where player is
		this.cash = 5000;

		// TODO: Allocate token correctly.
		//this.token = tokens[index];
	}

	move(spot) {
		// TODO: Check spot is in correct index range of tiles.
		this.spot = spot;
	}


	show(p, tiles) {
		p.fill(255);
		let current = tiles[this.spot];
		let center = current.getCenter();
		p.ellipse(center[0], center[1], 32, 32);
	}
}