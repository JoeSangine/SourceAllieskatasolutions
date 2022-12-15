// https://github.com/garora/TDD-Katas/tree/main/src#the-oddeven-kata

module.exports = {
	oddEven(start = 1, end = 100){
		if (start > end) throw new Error('Start must be less then or equal to End');

		for (let i = start; i <= end; i++){
			console.log(i % 2 ? 'Odd' : 'Even');
		}
	}
};