const Game = require('../conway');

class MockCanvasContext {
	fillRect(x, y, width, height) {}
	fill() {}
	beginPath() {}
	moveTo(x, y) {}
	lineTo(x, y) {}
	quadraticCurveTo(r1, a, r2, b) {}
}



test('Any live cell with no live neighbors dies.', () => {

	// create a new game:
	const ctx = new MockCanvasContext();
	const game = new Game(ctx, 1080, 720);

	// turn on a cell, and none of its neighbors:
	game.setCell(20, 30);

	// expect the cell to die over one round:
	expect(game.cells[20][30]).toBe(1);
	game.tick();
	expect(game.cells[20][30]).toBe(0);
});

const combinations_1 = require('./combinations_1.json');
describe.each(combinations_1)(
	'Any live cell with just 1 live neighbor dies.',
	(neighbors) => {
	test(`neighbor at ${neighbors.where}`, () => {

		// create a new game:
		const ctx = new MockCanvasContext();
		const game = new Game(ctx, 1080, 720);

		// turn a cell and 1 neighbor on:
		game.setCell(20, 30);
		const row = 20 + neighbors.row - 1;
		const col = 30 + neighbors.col - 1;
		game.setCell(row, col);

		// expect the cell to die over one round:
		expect(game.cells[20][30]).toBe(1);
		game.tick();
		expect(game.cells[20][30]).toBe(0);
	});
});

const combinations_2 = require('./combinations_2.json');
describe.each(combinations_2)(
	'Any live cell with 2 live neighbors survives.',
	(neighbors) => {
	test(`neighbors at (${neighbors[0].row}, ${neighbors[0].col}) ` +
		`and (${neighbors[1].row}, ${neighbors[1].col})`, () => {

		// create a new game:
		const ctx = new MockCanvasContext();
		const game = new Game(ctx, 1080, 720);

		// turn a cell and 2 neighbors on:
		game.setCell(15, 18);
		for (neighbor of neighbors) {
			const row = 15 + neighbor.row - 1;
			const col = 18 + neighbor.col - 1;
			game.setCell(row, col);
		}

		// expect the cell to survive over one round:
		expect(game.cells[15][18]).toBe(1);
		game.tick();
		expect(game.cells[15][18]).toBe(1);
	});
});

const combinations_3 = require('./combinations_3.json');
describe.each(combinations_3)(
	'Any live cell with 3 live neighbors survives.',
	(neighbors) => {
	test(`neighbors at (${neighbors[0].row}, ${neighbors[0].col}), ` +
		`(${neighbors[1].row}, ${neighbors[1].col}), and ` +
		`(${neighbors[2].row}, ${neighbors[2].col})`, () => {

		// create a new game:
		const ctx = new MockCanvasContext();
		const game = new Game(ctx, 1080, 720);

		// turn a cell and 3 neighbors on:
		game.setCell(42, 42);
		for (neighbor of neighbors) {
			const row = 42 + neighbor.row - 1;
			const col = 42 + neighbor.col - 1;
			game.setCell(row, col);
		}

		// expect the cell to survive over one round:
		expect(game.cells[42][42]).toBe(1);
		game.tick();
		expect(game.cells[42][42]).toBe(1);
	});
});

const combinations_4 = require('./combinations_4.json');
describe.each(combinations_4)(
	'Any live cell with 4 live neighbors dies.',
	(neighbors) => {
	test(`neighbors at (${neighbors[0].row}, ${neighbors[0].col}), ` +
		`(${neighbors[1].row}, ${neighbors[1].col}), ` +
		`(${neighbors[2].row}, ${neighbors[2].col}), and ` +
		`(${neighbors[3].row}, ${neighbors[3].col})`, () => {

		// create a new game:
		const ctx = new MockCanvasContext();
		const game = new Game(ctx, 1080, 720);

		// turn a cell and 4 neighbors on:
		game.setCell(21, 30);
		for (neighbor of neighbors) {
			const row = 21 + neighbor.row - 1;
			const col = 30 + neighbor.col - 1;
			game.setCell(row, col);
		}

		// expect the cell to die over one round:
		expect(game.cells[21][30]).toBe(1);
		game.tick();
		expect(game.cells[21][30]).toBe(0);
	});
});

const combinations_5 = require('./combinations_5.json');
describe.each(combinations_5)(
	'Any live cell with 5 live neighbors dies.',
	(neighbors) => {
	test(`neighbors at (${neighbors[0].row}, ${neighbors[0].col}), ` +
		`(${neighbors[1].row}, ${neighbors[1].col}), ` +
		`(${neighbors[2].row}, ${neighbors[2].col}), ` +
		`(${neighbors[3].row}, ${neighbors[3].col}), and ` +
		`(${neighbors[4].row}, ${neighbors[4].col})`, () => {

		// create a new game:
		const ctx = new MockCanvasContext();
		const game = new Game(ctx, 1080, 720);

		// turn a cell and 5 neighbors on:
		game.setCell(23, 59);
		for (neighbor of neighbors) {
			const row = 23 + neighbor.row - 1;
			const col = 59 + neighbor.col - 1;
			game.setCell(row, col);
		}

		// expect the cell to die over one round:
		expect(game.cells[23][59]).toBe(1);
		game.tick();
		expect(game.cells[23][59]).toBe(0);
	});
});

const combinations_6 = require('./combinations_6.json');
describe.each(combinations_6)(
	'Any live cell with 6 live neighbors dies.',
	(neighbors) => {
	test(`neighbors at (${neighbors[0].row}, ${neighbors[0].col}), ` +
		`(${neighbors[1].row}, ${neighbors[1].col}), ` +
		`(${neighbors[2].row}, ${neighbors[2].col}), ` +
		`(${neighbors[3].row}, ${neighbors[3].col}), ` +
		`(${neighbors[4].row}, ${neighbors[4].col}), and ` +
		`(${neighbors[5].row}, ${neighbors[5].col})`, () => {

		// create a new game:
		const ctx = new MockCanvasContext();
		const game = new Game(ctx, 1080, 720);

		// turn a cell and 6 neighbors on:
		game.setCell(40, 10);
		for (neighbor of neighbors) {
			const row = 40 + neighbor.row - 1;
			const col = 10 + neighbor.col - 1;
			game.setCell(row, col);
		}

		// expect the cell to die over one round:
		expect(game.cells[40][10]).toBe(1);
		game.tick();
		expect(game.cells[40][10]).toBe(0);
	});
});

const combinations_7 = require('./combinations_7.json');
describe.each(combinations_7)(
	'Any live cell with 7 live neighbors dies.',
	(neighbors) => {
	test(`neighbors at (${neighbors[0].row}, ${neighbors[0].col}), ` +
		`(${neighbors[1].row}, ${neighbors[1].col}), ` +
		`(${neighbors[2].row}, ${neighbors[2].col}), ` +
		`(${neighbors[3].row}, ${neighbors[3].col}), ` +
		`(${neighbors[4].row}, ${neighbors[4].col}), ` +
		`(${neighbors[5].row}, ${neighbors[5].col}), and ` +
		`(${neighbors[6].row}, ${neighbors[6].col})`, () => {

		// create a new game:
		const ctx = new MockCanvasContext();
		const game = new Game(ctx, 1080, 720);

		// turn a cell and 7 neighbors on:
		game.setCell(23, 20);
		for (neighbor of neighbors) {
			const row = 23 + neighbor.row - 1;
			const col = 20 + neighbor.col - 1;
			game.setCell(row, col);
		}

		// expect the cell to die over one round:
		expect(game.cells[23][20]).toBe(1);
		game.tick();
		expect(game.cells[23][20]).toBe(0);
	});
});

test('Any live cell with 8 live neighbors dies.', () => {

	// create a new game:
	const ctx = new MockCanvasContext();
	const game = new Game(ctx, 1080, 720);

	// turn a cell and all its neighbors on:
	for (rowIndex of [0, 1, 2]) {
		for (colIndex of [0, 1, 2]) {
			const row = 20 + rowIndex - 1;
			const col = 30 + colIndex - 1;
			game.setCell(row, col);
		}
	}

	// expect the cell to die over one round:
	expect(game.cells[20][30]).toBe(1);
	game.tick();
	expect(game.cells[20][30]).toBe(0);
});

describe.each(combinations_3)(
	'Any dead cell with 3 live neighbors becomes a live cell.',
	(neighbors) => {
	test(`neighbors at (${neighbors[0].row}, ${neighbors[0].col}), ` +
		`(${neighbors[1].row}, ${neighbors[1].col}), and ` +
		`(${neighbors[2].row}, ${neighbors[2].col})`, () => {

		// create a new game:
		const ctx = new MockCanvasContext();
		const game = new Game(ctx, 1080, 720);

		// turn 3 neighbors of a dead cell on:
		for (neighbor of neighbors) {
			const row = 42 + neighbor.row - 1;
			const col = 42 + neighbor.col - 1;
			game.setCell(row, col);
		}

		// expect the cell to become alive over one round:
		expect(game.cells[42][42]).toBe(0);
		game.tick();
		expect(game.cells[42][42]).toBe(1);
	});
});
