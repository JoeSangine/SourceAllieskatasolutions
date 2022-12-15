// https://github.com/garora/TDD-Katas/tree/main/src#the-primecomposite-kata

const isPrime = num => {
	for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
		if (num % i === 0) return false; 
	}
	return num > 1;
};


module.exports = {
	primeComposite(start = 1, end = 100){
		for (let n = start; n <= end; n++){
			let output = '';
			if (isPrime(n)) output = 'prime';
			else if (n % 2) output = 'composite';
			console.log(output || n);
		}
	}
};