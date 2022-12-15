module.exports = class Hashmap {
	constructor() {
		this._map = {};
	}

	size() {
		return Object.keys(this._map).length;
	}

	put(key, value) {
		if (value === undefined) {
			throw new Error('Cannot put undefined as a value!');
		}

		if (key === undefined) {
			throw new Error('Cannot put undefined as a key!');
		}

		this._map[key] = value;
	}

	get(key) {
		return this._map[key];
	}

	getKeys() {
		return Object.keys(this._map);
	}

	containsKey(key) {
		if (key === undefined) {
			throw new Error('This hashmap implementation cannot contain undefined as a key!');
		}

		return this._map[key] !== undefined;
	}

	containsValue(value) {
		if (value === undefined) {
			throw new Error('This hashmap implementation cannot contain undefined as a value!');
		}

		return Object.keys(this._map).filter(key => this._map[key] === value).length === 1;
	}

	remove(key) {
		delete this._map[key];
	}
};