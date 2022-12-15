// https://www.codewars.com/kata/5b715fd11db5ce5912000019

module.exports = {
	whereIsTheBall(start, swaps){
		let ball = start;
		for (const [from, to] of swaps){
			if (ball === from) ball = to;
			else if (ball === to) ball = from;
		}
		return ball;
	}
};