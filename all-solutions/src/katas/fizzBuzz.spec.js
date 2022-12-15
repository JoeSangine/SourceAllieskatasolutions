const { fizzBuzz } = require('./fizzBuzz');

afterEach(() => jest.resetAllMocks());

describe('fizzBuzz', () => {
	it('console.logs accordingly', () => {
		const log = jest.spyOn(console, 'log');
		fizzBuzz(1, 16);
		expect(log.mock.calls).toEqual([
			[1],
			[2],
			['Fizz'],
			[4],
			['Buzz'],
			['Fizz'],
			[7],
			[8],
			['Fizz'],
			['Buzz'],
			[11],
			['Fizz'],
			[13],
			[14],
			['FizzBuzz'],
			[16],
		]);
	});
	it('throws error for invalid start & end order', () => {
		expect(() => fizzBuzz(3, 1)).toThrowError('Start must be less then or equal to End');
	});
});