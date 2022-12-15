// https://github.com/rswyatt/sourceallies

const fs = require('fs');

module.exports = {
	async getTopN(textPath, stopPath, n = 100){
		const text = await fs.promises.readFile(textPath, 'utf-8');
		text;
		const stopWords = new Set((await fs.promises.readFile(stopPath, 'utf-8')).trim().toLowerCase().split('\n').map(word => word.trim()).filter(Boolean));
		stopWords;

		const chaptersText = text.toLowerCase().split(/CHAPTER \d+/i).slice(1);
		const counts = new Map();
		for (const chapter of chaptersText){
			const words = chapter.split(/\s+/).map(word => word.replace(/[.!,;?]/g, '').replace(/--/g, '-')).filter(Boolean);
			for (const word of words){
				if (!stopWords.has(word)) counts.set(word, counts.get(word) + 1 || 1);
			}
		}
		return new Map([...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, n));
	},
	async getTopNPerChapter(textPath, stopPath, n = 100){
		const text = await fs.promises.readFile(textPath, 'utf-8');
		const stopWords = new Set((await fs.promises.readFile(stopPath, 'utf-8')).trim().toLowerCase().split('\n').map(word => word.trim()).filter(Boolean));

		const chaptersText = text.toLowerCase().split(/CHAPTER \d+/i).slice(1);
		const chapterCounts = [];
		for (const chapter of chaptersText){
			const counts = new Map();
			const words = chapter.split(/\s+/).map(word => word.replace(/[.!,;?]/g, '').replace(/--/g, '-')).filter(Boolean);
			for (const word of words){
				if (!stopWords.has(word)) counts.set(word, counts.get(word) + 1 || 1);
			}
			chapterCounts.push(counts);
		}
		return chapterCounts.map(counts => new Map([...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, n)));
	}
};