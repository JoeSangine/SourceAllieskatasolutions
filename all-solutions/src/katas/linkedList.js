class Node {
	constructor(value = null, next = null){
		this._value = value;
		this.next = next;
	}

	value(){
		return this._value;
	}
	
}

module.exports = class List {
	constructor(){
		this._root = null;
	}

	find(value){
		let current = this._root;
		while (current){
			if (current.value() === value) return current;
			current = current.next;
		}
		return null;
	}

	add(value){
		if (!this._root) {
			this._root = new Node(value);
			return this;
		}
		let current = this._root;
		while (current.next){
			current = current.next;
		}
		current.next = new Node(value);
		return this;
	}

	values(){
		const values = [];
		let current = this._root;
		while (current){
			values.push(current.value());
			current = current.next;
		}
		return values;
	}

	delete(nodeOrValue){
		if (this._root === nodeOrValue || this._root?.value() === nodeOrValue){
			this._root = this._root.next;
			return this;
		}

		let current = this._root;
		let prev = this._root;
		while (current){
			if (current === nodeOrValue || current.value() === nodeOrValue){
				prev.next = current.next;
				return this;
			}
			prev = current;
			current = current.next;
		}
		return this;


	}
};