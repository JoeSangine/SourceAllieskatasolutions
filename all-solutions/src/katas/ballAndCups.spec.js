const { whereIsTheBall } = require('./ballAndCups.js');

describe('whereIsTheBall', () => {
	it('is under 1 after a single swap', () => {
		expect(whereIsTheBall(2, [[1, 2]])).toBe(1);
	});
	it('is under 1 after three swaps', () => {
		expect(whereIsTheBall(1, [[2, 3], [1, 2], [1, 2]])).toBe(1);
	});
	it('is under 3 after four swaps', () => {
		expect(whereIsTheBall(2, [[1, 3], [1, 2], [2, 1], [2, 3]])).toBe(3);
	});
});