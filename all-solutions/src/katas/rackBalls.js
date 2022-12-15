// http://codekata.com/kata/kata11-sorting-it-out/

class Rack{
	constructor(){
		this._balls = [];
	}

	add(number){
		this._balls.push(number);
		return this;
	}

	get balls(){
		return this._balls.sort((a, b) => a - b);
	}
}

module.exports = {
	Rack
};