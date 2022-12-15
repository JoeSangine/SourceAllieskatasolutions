const { logAnagrams } = require('./anagrams.js');

afterEach(() => jest.resetAllMocks());

describe('Anagrams', () => {
	test('console logs found anagrams lexographically', () => {
		const log = jest.spyOn(globalThis.console, 'log');
		logAnagrams(`
fresher
silent
boaters
listen
inlets
borates
stink
sinks
pinkish
boaster
kinship
skins
enlist
refresh
sort
rots
knits
	`.trim());
		expect(log.mock.calls).toEqual([
			['boaster boaters borates'],
			['fresher refresh'],
			['enlist inlets listen silent'],
			['kinship pinkish'],
			['sinks skins'],
			['knits stink'],
			['rots sort']
		]);
	});
});