// http://codekata.com/kata/kata19-word-chains/

const canTransformInfo = (a, b) => {
	if (a.length !== b.length) return false;
	if (a === b) return true;

	let diff = 0;
	for (let i = 0; i < a.length; i++){
		if (a[i] !== b[i]) diff++;
	}
	return diff <= 1;
};

const wordChain = (start, end, dictionary) => {
	// If can turn start into end, or any recursive calls from start
	// to a word in dictionary returns true
	return canTransformInfo(start, end) || dictionary.some(word =>
		canTransformInfo(start, word) && wordChain(word, end, dictionary.filter(dWord => dWord !== word))
	);
};

module.exports = {
	wordChain
};