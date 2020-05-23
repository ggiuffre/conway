const Game = require('../conway');

class MockCanvasContext {
	fillRect(x, y, width, height) {}
	fill() {}
	beginPath() {}
	moveTo(x, y) {}
	lineTo(x, y) {}
	quadraticCurveTo(r1, a, r2, b) {}
}



describe('A new game has a known size.', () => {

	// create a new game:
	const width = 1080;
	const height = 720;
	const ctx = new MockCanvasContext();
	const game = new Game(ctx, width, height);

	// expect the width to be as specified:
	test('It has a known width.', () => {
		expect(game.width).toBe(width);
	});

	// expect the height to be as specified:
	test('It has a known height.', () => {
		expect(game.height).toBe(height);
	});
});

describe.each([[500, 800], [15, 7]])(
	'The width/height ratio is proportional to columns/rows.',
	(width, height) => {
	test(`width = ${width}, height = ${height}`, () => {

		// create a new game:
		const ctx = new MockCanvasContext();
		const game = new Game(ctx, width, height);

		// expect width/height to have the same sign as columns/rows:
		expect(game.width < game.height)
			.toBe(game.nColumns < game.nRows);
	});
});

describe.each([[1080, 720], [20, 40]])(
	'The cell size is less than the total width and height.',
	(width, height) => {
	test(`width = ${width}, height = ${height}`, () => {

		// create a new game:
		const ctx = new MockCanvasContext();
		const game = new Game(ctx, width, height);

		// expect the cell size to be legal:
		expect(game.cellSize).toBeGreaterThan(0);
		expect(game.cellSize).toBeLessThan(game.width);
		expect(game.cellSize).toBeLessThan(game.height);
	});
});

test('The cells in a game can only have two possible states.', () => {

	// create a new game:
	const ctx = new MockCanvasContext();
	const game = new Game(ctx, 1080, 720);

	// expect the cells to have less than 3 states:
	const startingStates = new Set(game.cells.flat());
	expect(startingStates.size).toBeLessThan(3);

	// expect the cells to have less than 3 states:
	game.setRandomState();
	const LaterStates = new Set(game.cells.flat());
	expect(LaterStates.size).toBeLessThan(3);
});

test('The cells of a game can be reset.', () => {

	// create a new game:
	const ctx = new MockCanvasContext();
	const game = new Game(ctx, 1080, 720);

	// expect the reset() method to bring the cells to a unique value:
	game.setRandomState();
	game.reset();
	const states = new Set(game.cells.flat());
	expect(game.cells[0][0]).toBe(0);
	expect(states.size).toBe(1);
});
