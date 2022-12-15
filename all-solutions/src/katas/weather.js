// http://codekata.com/kata/kata04-data-munging/

const fs = require('fs');

async function getDayWithLeastSpread(filename) {
	return getSmallestSpreadRow(filename, 'MxT', 'MnT', 'Dy');
}

async function getTeamWithLeastSpread(filename) {
	return getSmallestSpreadRow(filename, 'F', 'A', 'Team', line => line.replace(/-+/g, '').replace(/\d+./, '').trim());
}

async function getSmallestSpreadRow(filename, columnA, columnB, rowColumn, processLine = line => line){
	const content = await fs.promises.readFile(filename, 'utf-8');
	const [header, ...lines] = content.trim().split('\n');
	const columnIndexes = header.split(/\s+/).reduce((obj, col, i) => {
		obj[col] = i;
		return obj;
	}, {});

	let best = { result: null, spread: Infinity };

	for (const line of lines) {
		if (!line) continue;
		const values = processLine(line).split(/\s+/);
		const high = +values[columnIndexes[columnA]];
		const low = +values[columnIndexes[columnB]];
		const spread = Math.abs(high - low);
		if (spread < best.spread) best = { result: values[columnIndexes[rowColumn]], spread };
	}

	return best.result;
}

module.exports = {
	getDayWithLeastSpread, getTeamWithLeastSpread
};