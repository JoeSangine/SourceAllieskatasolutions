const { getRandomColor } = require('./randomColor.js');

afterEach(() => jest.resetAllMocks());

describe('Random Color', () => {
	test('Used Math.random()', () => {
		const random = jest.spyOn(Math, 'random').mockImplementation(() => .5);
		getRandomColor('red', 'green', 'blue');
		expect(random).toBeCalled();
		random.mockRestore();
	});
	test('is equally random', () => {
		const results = {};
		for (let i = 0; i < 100000; i++){
			const color = getRandomColor('red', 'green', 'blue', 'yellow');
			results[color] = results[color] + .00001 || .00001;
		}
		expect(results).toMatchObject(Object.keys(results).reduce((obj, key) => {
			obj[key] = expect.closeTo(.25, 2);
			return obj;
		}, {}));
	});
});