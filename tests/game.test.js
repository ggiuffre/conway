const Game = require('../conway');

class MockCanvasContext {
	fillRect(x, y, width, height) {}
	fill() {}
	beginPath() {}
	moveTo(x, y) {}
	lineTo(x, y) {}
	quadraticCurveTo(r1, a, r2, b) {}
}



test('A new game has a specified width and height.', () => {
	const width = 1080;
	const height = 720;
	const ctx = new MockCanvasContext();
	const game = new Game(ctx, width, height);
	expect(game.width).toBe(width);
	expect(game.height).toBe(height);
});

test('The columns/rows ratio is proportional to width/height.', () => {
	const ctx1 = new MockCanvasContext();
	const game1 = new Game(ctx1, 500, 800);
	expect(game1.width / game1.height > 1)
		.toBe(game1.nColumns / game1.nRows > 1);

	const ctx2 = new MockCanvasContext();
	const game2 = new Game(ctx2, 15, 7);
	expect(game2.width / game2.height > 1)
		.toBe(game2.nColumns / game2.nRows > 1);
});

test('The cell size is less than the width and height of the game.', () => {
	const ctx1 = new MockCanvasContext();
	const game1 = new Game(ctx1, 1080, 720);
	expect(game1.cellSize).toBeLessThan(game1.width);
	expect(game1.cellSize).toBeLessThan(game1.height);

	const ctx2 = new MockCanvasContext();
	const game2 = new Game(ctx2, 1080, 720);
	expect(game2.cellSize).toBeLessThan(game2.width);
	expect(game2.cellSize).toBeLessThan(game2.height);
});

test('The cells in a game can only have two possible states.', () => {
	const ctx = new MockCanvasContext();
	const game = new Game(ctx, 1080, 720);
	const startingStates = new Set(game.cells.flat());
	expect(startingStates.size).toBeLessThan(3);

	game.setRandomState();
	const LaterStates = new Set(game.cells.flat());
	expect(LaterStates.size).toBeLessThan(3);
});

test('The cells of a game can be reset.', () => {
	const ctx = new MockCanvasContext();
	const game = new Game(ctx, 1080, 720);
	game.setRandomState();
	game.reset();
	const states = new Set(game.cells.flat());
	expect(states.size).toBe(1);
});
