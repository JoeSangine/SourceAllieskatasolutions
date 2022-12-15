// http://codekata.com/kata/kata18-transitive-dependencies/

module.exports = {
	transitiveDependencies(string){
		const dependencyMap = new Map();

		for (const line of string.split('\n')){
			const [root, ...deps] = line.split(/\s+/);
			dependencyMap.set(root, deps);
		}

		
		let lines = [];

		for (const root of dependencyMap.keys()){
			let allDeps = new Set();

			const dependencies = [...dependencyMap.get(root)];
			while (dependencies.length){
				const dep = dependencies.pop();
				allDeps.add(dep);
				dependencies.push(...(dependencyMap.get(dep) || []));
			}
			lines.push([ root, ' ', ...[...allDeps].sort() ].join(' '));
		}

		return lines.join('\n');
	}
};