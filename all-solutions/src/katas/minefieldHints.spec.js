const { minefieldHints } = require('./minefieldHints');

describe('minefieldHints', () => {
	it('works', () => {
		expect(minefieldHints(`
*...
..*.
....
`.trim())).toStrictEqual(`
*211
12*1
0111
`.trim());
	});
});