// http://codekata.com/kata/kata08-conflicting-objectives/

function sixLetterWords(bank){
	let result = [];
	for(let i = 0; i < bank.length; i++){
		for(let j = 0; j < bank.length; j++){
			if(bank[i].length + bank[j].length === 6 && bank.includes(bank[i] + bank[j])){
				result.push(bank[i] + bank[j]);
			}
		}
	}
	return result;
}

module.exports = {
	sixLetterWords
};