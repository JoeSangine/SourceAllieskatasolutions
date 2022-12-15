// https://github.com/garora/TDD-Katas/tree/main/src#the-word-wrap-kata-via-codingdojo

module.exports = {
	wordWrapper(text, length){
		const words = text.split(/\s+/).reverse();

		const lines = [];
		let line = [];
		while(words.length){
			// keep adding words if there exist words && the line is too short
			while (words.length && line.join(' ').length < length){
				line.push(words.pop());
			}
			// if line too long and more then two words, put one word back
			if (line.join(' ').length > length && line.length > 1){
				words.push(line.pop());
			}
			lines.push(line.join(' '));
			line = [];
		}
		return lines;
	}
};