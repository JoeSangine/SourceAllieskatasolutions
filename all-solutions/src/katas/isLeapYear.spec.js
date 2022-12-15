const { isLeapYear } = require('./isLeapYear');

describe('isLeapYear', () => {
	it('works', () => {
		expect(isLeapYear(1996)).toBeTruthy();
		expect(isLeapYear(2000)).toBeTruthy();
		expect(isLeapYear(2004)).toBeTruthy();

		expect(isLeapYear(1999)).toBeFalsy();
		expect(isLeapYear(2001)).toBeFalsy();
	});
});