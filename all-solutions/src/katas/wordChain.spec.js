const { wordChain } = require('./wordChain');

describe('wordChain', () => {
	it('returns false', () => {
		expect(wordChain('cat', 'dog', [])).toBeFalsy();
	});
	
	it('returns true if the words can be directly transformed', () => {
		expect(wordChain('cog', 'dog', [])).toBeTruthy();
	});

	it('returns true if words can be transformed via dictionary', () => {
		expect(wordChain('cat', 'dog', ['cot', 'cog'])).toBeTruthy();
	});
});