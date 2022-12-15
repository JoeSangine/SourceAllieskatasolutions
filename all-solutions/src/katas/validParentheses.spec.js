const { validParentheses } = require('./validParentheses');

describe('validParentheses', () => {
	it('works', () => {
		expect(validParentheses('')).toBeTruthy();
		expect(validParentheses('[]')).toBeTruthy();
		expect(validParentheses('{}')).toBeTruthy();
		expect(validParentheses('()')).toBeTruthy();

		expect(validParentheses('(')).toBeFalsy();
		expect(validParentheses(')')).toBeFalsy();
		expect(validParentheses('([)]')).toBeFalsy();
	});

	it('allows customization', () => {
		expect(validParentheses('Abca', { A: 'a' })).toBeTruthy();
	});
});