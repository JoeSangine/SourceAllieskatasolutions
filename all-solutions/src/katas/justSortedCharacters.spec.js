const { justSortedCharacters } = require('./justSortedCharacters');

describe('justSortedCharacters', () => {
	it('returns just-characters sorted', () => {
		expect(justSortedCharacters('When not studying nuclear physics, Bambi likes to play beach volleyball.')).toBe('aaaaabbbbcccdeeeeeghhhiiiiklllllllmnnnnooopprsssstttuuvwyyyy');
	});
});