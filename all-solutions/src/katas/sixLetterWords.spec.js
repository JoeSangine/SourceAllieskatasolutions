const { sixLetterWords } = require('./sixLetterWords');

function fisherYatesShuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

describe('sixLetterWords', () => {
	it('returns an array of words composed of two smaller words', () => {
		const bank = fisherYatesShuffle(['al', 'bums', 'albums',
			'bar', 'ely', 'barely',
			'be', 'foul', 'befoul',
			'con', 'vex', 'convex',
			'here', 'by', 'hereby',
			'jig', 'saw', 'jigsaw',
			'tail', 'or', 'tailor',
			'we', 'aver', 'weaver',]);
		expect(sixLetterWords(bank).sort()).toEqual(['albums', 'barely', 'befoul', 'convex', 'hereby', 'jigsaw', 'tailor', 'weaver'].sort());
	});
});