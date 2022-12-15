// https://github.com/garora/TDD-Katas/tree/main/src#leap-year-

module.exports = {
	isLeapYear: year => (year % 4 === 0 && year % 1000 !== 0) || (year % 400 === 0)
};