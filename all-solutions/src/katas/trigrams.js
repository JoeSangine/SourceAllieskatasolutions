// http://codekata.com/kata/kata14-tom-swift-under-the-milkwood/

const Hashmap = require('../structures/Hashmap.js');

module.exports = {
	trigrams(string){
		const words = string.split(/\s+/);
		const trigrams = new Hashmap();
		for (let i = 0; i < words.length - 2; i++){
			const key = words[i] + ' ' + words[i + 1];
			if (!trigrams.containsKey(key)) trigrams.put(key, []);
			trigrams.get(key).push(words[i + 2]);
		}
		return trigrams;
	}
};