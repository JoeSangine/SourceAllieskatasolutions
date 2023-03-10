const { transitiveDependencies } = require('./transitiveDependencies.js');

describe('transitiveDependencies', () => {
	it('works', () => {
		expect(transitiveDependencies(`
A   B   C
B   C   E
C   G
D   A   F
E   F
F   H
`.trim())).toStrictEqual(`
A   B C E F G H
B   C E F G H
C   G
D   A B C E F G H
E   F H
F   H
`.trim());
	});
});