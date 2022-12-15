const { Rack } = require('./rackBalls');

describe('rackBalls', () => {
	it('Returns numbers added always in order', () => {
		const rack = new Rack();
		rack.add(20);
		expect(rack.balls).toEqual([20]);
		rack.add(10);
		expect(rack.balls).toEqual([10, 20]);
		rack.add(30);
		expect(rack.balls).toEqual([10, 20, 30]);
		rack.add(15);
		expect(rack.balls).toEqual([10, 15, 20, 30]);
	});

	it('Is chainable', () => {
		const rack = new Rack();
		expect(rack.add(10)).toBe(rack);
	});
});