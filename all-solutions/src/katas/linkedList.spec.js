// http://codekata.com/kata/kata21-simple-lists/

const List = require('./linkedList');

describe('List', () => {
	it('find & add', () => {
		const list = new List();
		expect(list.find('fred')).toBeNull();
		expect(list.add('fred').find('fred')?.value()).toBe('fred');
		expect(list.find('wilma')).toBeNull();

		list.add('wilma');
		expect(list.find('fred').value()).toBe('fred');
		expect(list.find('wilma').value()).toBe('wilma');
		expect(list.values()).toEqual(['fred', 'wilma']);
	});
	test('delete', () => {
		const list = new List();
		list.add('fred').add('wilma').add('betty').add('barney');
		expect(list.values()).toEqual(['fred', 'wilma', 'betty', 'barney']);
		list.delete(list.find('wilma'));
		expect(list.values()).toEqual(['fred', 'betty', 'barney']);
		list.delete('barney');
		expect(list.values()).toEqual(['fred', 'betty']);
		list.delete(list.find('fred'));
		expect(list.values()).toEqual(['betty']);
		list.delete('betty');
		expect(list.values()).toEqual([]);
	});
});