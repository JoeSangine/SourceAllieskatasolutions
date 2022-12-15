// http://codekata.com/kata/kata11-sorting-it-out/

module.exports = {
	justSortedCharacters(string){
		return [...string.toLowerCase()].filter(char => char >= 'a' && char <= 'z').sort().join('');
	}
};