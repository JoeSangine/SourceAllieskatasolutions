// http://codekata.com/kata/kata06-anagrams/

function logAnagrams(wordFile){
	const anagramMap = new Map();
	for (const word of wordFile.toLowerCase().split('\n')){
		const anagramKey = [...word].sort().join('');
		
		if (!anagramMap.has(anagramKey)) anagramMap.set(anagramKey, []);

		const wordAnagrams = anagramMap.get(anagramKey);
		wordAnagrams.push(word);
		wordAnagrams.sort();
	}

	for (const [_, anagrams] of [...anagramMap.entries()].sort((a, b) => a[0].localeCompare(b[0]))){
		console.log(anagrams.join(' '));
	}
}

module.exports = {
	logAnagrams
};