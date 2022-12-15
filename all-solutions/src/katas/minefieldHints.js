// https://github.com/garora/TDD-Katas/tree/main/src#mine-fields-

module.exports = {
	minefieldHints(minefield){
		const matrix = minefield.split('\n').map(line => [...line]);
		for (let r = 0; r < matrix.length; r++){
			for (let c = 0; c < matrix[r].length; c++) {
				if (matrix[r][c] === '*') continue;
				let minesAround = 0;
				for (let ro = -1; ro <= 1; ro++){
					for (let co = -1; co <= 1; co++){
						if (!ro && !co) continue;
						if (matrix[r + ro]?.[c + co] === '*') minesAround++;
					}
				}
				matrix[r][c] = minesAround;
			}
		}
		return matrix.map(line => line.join('')).join('\n');
	}
};