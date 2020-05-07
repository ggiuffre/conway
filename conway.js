const floor = Math.floor;

/**
 * State and behavior of an instance of Conway's Game of Life.
 *
 * @class      Game game
 */
class Game {

	/**
	 * Constructs a Game object.
	 * 
	 * @param      {object}  context     The JS canvas context
	 * @param      {number}  width       The game's width
	 * @param      {number}  height      The game's height
	 */
	constructor(context, width, height) {

		// initialize graphic constants:
		this.ctx = context;
		this.width = width;
		this.height = height;
		this.cellSize = 0.2 * (width ** 0.55);
		this.nRows = floor(height / this.cellSize);
		this.nColumns = this.nRows + floor((width - height) / this.cellSize);
		this.xCenteringOffset = (width - this.nColumns * this.cellSize) / 2;
		this.yCenteringOffset = (height - this.nRows * this.cellSize) / 2;
		this.cellPadding = 0.01 * this.cellSize;

		// reset the game state:
		this.cells = new Array(this.nRows);
		for (let row = 0; row < this.cells.length; row++) {
			this.cells[row] = new Array(this.nColumns);
			for (let col = 0; col < this.cells[row].length; col++) {
				this.cells[row][col] = 0;
			}
		}
	}

	/**
	 * Draws all the game, based on its current state.
	 */
	draw() {

		// erase everything:
		this.ctx.fillStyle = rgb(30, 30, 30);
		this.ctx.fillRect(0, 0, this.width, this.height);

		// draw each cell:
		for (let row = 0; row < this.nRows; row++)
			for (let col = 0; col < this.nColumns; col++)
				this.drawCell(row, col);
	}

	/**
	 * Draws the cell at a specified (row, column) position. The color of
	 * the cell is determined by the value of its corresponding cell.
	 *
	 * @param      {number}  row     The cell's row
	 * @param      {number}  col     The cell's column
	 */
	drawCell(row, col) {

		// declare some useful geometric constants:
		const xOffset = this.xCenteringOffset + this.cellPadding;
		const yOffset = this.yCenteringOffset + this.cellPadding;
		const cellInnerSize = this.cellSize - this.cellPadding * 2;

		// calculate the coordinates of the cell's enclosing rectangle:
		const y = row * this.cellSize + yOffset;
		const x = col * this.cellSize + xOffset;

		// choose a color for the cell:
		const color = this.cells[row][col];
		this.ctx.fillStyle = rgb(0, 200 * color, 140 * color);

		// draw the cell:
		smoothRectangle(this.ctx, x, y, cellInnerSize, cellInnerSize);
		this.ctx.fill();
	}

	/**
	 * Sets a specified cell to a certain value.
	 *
	 * @param      {number}  row        The cell's row
	 * @param      {number}  col        The cell's column
	 * @param      {number}  [value=1]  The new value
	 */
	setCell(row, col, value = 1) {
		if (row >= 0 && row < this.nRows && col >= 0 && col < this.nColumns)
			this.cells[row][col] = value;
	}

	/**
	 * Returns the theoretical neighbors of a cell at position (row, col),
	 * regardless of whether the cell is at the border or not.
	 *
	 * @param      {number}  row     The cell's row
	 * @param      {number}  col     The cell's column
	 * @return     {Array}   Theoretical neighbors of the cell.
	 */
	potentialNeihgbors(row, col) {
		return [
			[row - 1, col - 1],
			[row - 1, col],
			[row - 1, col + 1],
			[row, col - 1],
			[row, col + 1],
			[row + 1, col - 1],
			[row + 1, col],
			[row + 1, col + 1]
		];
	}

	/**
	 * Returns all the neighbors of a specified cell.
	 *
	 * @param      {number}  row     The cell's row
	 * @param      {number}  col     The cell's col
	 * @return     {Array}   The cell's neighbors.
	 */
	getCellNeighbors(row, col) {

		// make sure that row and column are numbers:
		row = Number(row);
		col = Number(col);

		// calculate the cell's neighbors, disregarding the borders:
		const candidates = this.potentialNeihgbors(row, col);

		// only consider the neighbors that are inside the borders:
		let neighbors = [];
		for (let c in candidates) {
			const x = Number(candidates[c][0]);
			const y = Number(candidates[c][1]);
			if (x >= 0 && x < this.nRows && y >= 0 && y < this.nColumns)
				neighbors.push(this.cells[x][y]);
		}

		// return the list of neighbors:
		return neighbors;
	}

	/**
	 * Updates the state of the game, based on the rules of Conway's Game of
	 * Life.
	 */
	tick() {

		// create a deep copy of the game's current state:
		const newState = new Array(this.nRows);
		for (let row = 0; row < newState.length; row++)
			newState[row] = this.cells[row].slice();

		// calculate the next state of each cell:
		for (let row in newState) {
			for (let col in newState[row]) {
				const neighbors = this.getCellNeighbors(row, col);

				let life = 0;
				for (let n in neighbors)
					life += neighbors[n];

				if (life == 3 && this.cells[row][col] < 1)
					newState[row][col] = 1;

				if (life > 3 && this.cells[row][col] > 0)
					newState[row][col] = 0;

				if (life < 2 && this.cells[row][col] > 0)
					newState[row][col] = 0;
			}
		}

		// update the state of the game and draw the whole game:
		this.cells = newState;
		this.draw();
	}
}

/**
 * Returns a string that represents a valid CSS color, based on the absolute
 * amount of red, green, and blue provided as integers in [0, 256).
 *
 * @param      {string}  red     The absolute amount of red
 * @param      {string}  green   The absolute amount of green
 * @param      {string}  blue    The absolute amount of blue
 * @return     {string}  The string representation of a valid CSS color.
 */
function rgb(red, green, blue) {
	return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}

/**
 * Draws the path of a rectangle with smooth vertices, specified by the
 * position of its left edge (x), the position of its upper edge (y), its
 * widt (w), its height (h), and an optional value for the border radius.
 * Note that you are responsible for filling or stroking the path after having
 * called `smoothRectangle`.
 *
 * @param      {object}  ctx         The JS canvas context
 * @param      {number}  x           The position of the left edge
 * @param      {number}  y           The position of the upper edge
 * @param      {number}  w           The width
 * @param      {number}  h           The height
 * @param      {number}  [radius=3]  The border radius
 */
function smoothRectangle(ctx, x, y, w, h, radius = 3) {

	// calculate the right and bottom edges:
	const r = x + w;
 	const b = y + h;

 	// draw a line path:
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(r - radius, y);
	ctx.quadraticCurveTo(r, y, r, y + radius);
	ctx.lineTo(r, b - radius);
	ctx.quadraticCurveTo(r, b, r - radius, b);
	ctx.lineTo(x + radius, b);
	ctx.quadraticCurveTo(x, b, x, b - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
}



// create a new game:
const canvas = document.querySelector('#conway');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const game = new Game(ctx, width, height);

// initialize the new game with a random state:
for (let i = 0; i < 10; i++) {
	const row = floor(Math.random() * game.nRows);
	const col = floor(Math.random() * game.nColumns);
	const neighbors = game.potentialNeihgbors(row, col);
	for (let n in neighbors) {
		const randomState = floor(Math.random() >= 0.5);
		game.setCell(neighbors[n][0], neighbors[n][1], randomState);
	}
}

// draw the game:
game.draw();

// set the game's state to be updated every second:
window.setInterval(function() {
	game.tick();
}, 1000);
