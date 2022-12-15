const { primeComposite } = require('./primeComposite');

afterEach(() => jest.resetAllMocks());

describe('primeComposite', () => {
	it('works', () => {
		const log = jest.spyOn(console, 'log');
		expect(primeComposite(5, 15));
		expect(log.mock.calls).toEqual([
			[ 'prime' ],
			[ 6 ],
			[ 'prime' ],
			[ 8 ],
			[ 'composite' ],
			[ 10 ],
			[ 'prime' ],
			[ 12 ],
			[ 'prime' ],
			[ 14 ],
			[ 'composite' ]
		]);
	});
});