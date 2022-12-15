module.exports = class Stack {
	constructor() {
		this._array = [];
	}

	size() {
		return this._array.length;
	}

	push(item) {
		this._array.push(item);
	}

	peek() {
		if (this.size() === 0) {
			throw new Error('Cannot peek on an empty stack!');
		}

		return this._array[this.size() - 1];
	}

	pop() {
		if (this.size() === 0) {
			throw new Error('Cannot pop on an empty stack!');
		}

		return this._array.splice(this.size() - 1)[0];
	}
};