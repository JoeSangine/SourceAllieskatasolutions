// https://github.com/garora/TDD-Katas/tree/main/src#the-fizzbuzz-kata

module.exports = {
	fizzBuzz(start = 1, end = 100){
		if (start > end) throw new Error('Start must be less then or equal to End');

		for (let i = start; i <= end; i++){
			let output = '';
			if (i % 3 === 0) output += 'Fizz';
			if (i % 5 === 0) output += 'Buzz';
			console.log(output || i);
		}
	}
};