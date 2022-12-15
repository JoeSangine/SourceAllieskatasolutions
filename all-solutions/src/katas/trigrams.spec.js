const Hashmap = require('../structures/Hashmap');
const { trigrams } = require('./trigrams');

describe('trigrams', () => {
	it('works', () => {
		const hm = new Hashmap();
		for (const [key, value] of Object.entries({
			'I wish':['I', 'I'],
			'wish I':['may', 'might'],
			'may I' :['wish'],
			'I may' :['I']
		})) hm.put(key, value);
		expect(trigrams('I wish I may I wish I might')).toStrictEqual(hm);
	});
});