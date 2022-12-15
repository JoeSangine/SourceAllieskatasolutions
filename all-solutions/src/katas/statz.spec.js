const { statz } = require('./statz');

describe('statz', () => {
	it('works', () => {
		expect(statz([1, 2, 3, 4, 5])).toEqual({
			min: 1,
			max: 5,
			count: 5,
			average: 3
		});
	});
	it('returns null for empty array', () => {
		expect(statz([])).toBe(null);
	});
	it('average is accurate', () => {
		expect(statz([0.1, 0.2])).toMatchObject({
			average: expect.closeTo(.15, 2)
		});
	});
});