const { wordWrapper } = require('./wordWrapper');

describe('wordWrapper', () => {
	it('works', () => {
		expect(wordWrapper('hello world what is up', 14)).toStrictEqual([
			'hello world',
			'what is up'
		]);
	});
	it('handles too long words', () => {
		expect(wordWrapper('hello world 012345678901234567890 what is up', 14)).toStrictEqual([
			'hello world',
			'012345678901234567890',
			'what is up'
		]);
	});
});