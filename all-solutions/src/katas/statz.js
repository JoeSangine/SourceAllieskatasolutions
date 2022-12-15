// https://github.com/garora/TDD-Katas/tree/main/src#kata---coming-next-httpwwwcyber-dojocom

module.exports = {
	statz(numbers){
		if (!numbers.length) return null;

		return {
			min: Math.min(...numbers),
			max: Math.max(...numbers),
			count: numbers.length,
			average: numbers.reduce((sum, num) => sum + num, 0) / numbers.length
		};
	}
};