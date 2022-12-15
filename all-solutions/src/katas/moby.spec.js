/*
Given a text file of moby dick, and a file of stop files, return the top 100 words - excluding stop words - ordered by frequency
*/
const path = require('path');
const fs = require('fs');

const { getTopN, getTopNPerChapter } = require('./moby.js');

const MOBY_PATH = path.join(__dirname, 'moby.txt');
const STOPWORDS_PATH = path.join(__dirname, 'stopwords.txt');

afterEach(() => jest.clearAllMocks());

describe('getTopN', () => {
	it('returns on test', async () => {
		const mockedReadfile = jest.spyOn(fs.promises, 'readFile')
			
			.mockImplementationOnce(() => 'CHAPTER 1\n' + 'abc '.repeat(123) + ' def '.repeat(5))
			.mockImplementationOnce(() => '');
		await expect(getTopN('./moby.txt', './stopwords.txt')).resolves.toEqual(new Map(Object.entries({
			abc: 123,
			def: 5
		})));
		expect(mockedReadfile).toBeCalledWith('./moby.txt', 'utf-8');
		expect(mockedReadfile).toBeCalledWith('./stopwords.txt', 'utf-8');
	});
	it('returns top 5 excluding stop words', async () => {
		expect(await getTopN(MOBY_PATH, STOPWORDS_PATH, 5)).toEqual(new Map(Object.entries({
			whale: 861, ahab: 401, ship: 365, sea: 355, time: 317
		})));
	});
});
describe('getTopNPerChapter', () => {
	it('returns top 5 excluding stop words', async () => {
		expect(await getTopNPerChapter(MOBY_PATH, STOPWORDS_PATH, 1)).not.toBeFalsy();
	});
});