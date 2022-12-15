const { oddEven } = require('./oddEven');

afterEach(() => jest.resetAllMocks());

describe('oddEven', () => {
	it('console.logs odd for odd numbers, and even for even numbers', () => {
		const log = jest.spyOn(console, 'log');
		oddEven(1, 3);
		expect(log.mock.calls).toEqual([['Odd'], ['Even'], ['Odd']]);
	});
	it('throws error for invalid start & end order', () => {
		expect(() => oddEven(3, 1)).toThrowError('Start must be less then or equal to End');
	});
});