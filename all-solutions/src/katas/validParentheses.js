// https://leetcode.com/problems/valid-parentheses/

const Stack = require('../structures/Stack');

module.exports = {
	validParentheses(string, pairs = {'(': ')', '[': ']', '{': '}'}){
		const opens = Object.keys(pairs);
		const closes = Object.values(pairs);
		
		const stack = new Stack();
		for (const char of string){
			if (opens.includes(char)){
				stack.push(char);
			} else if (closes.includes(char)) {
				if (!stack.size()) return false;
				
				const index = closes.indexOf(char);
				if (opens[index] !== stack.peek()) return false;

				stack.pop();
			}
		}
		return stack.size() === 0;
	}
};