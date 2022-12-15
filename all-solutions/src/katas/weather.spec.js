const { getDayWithLeastSpread, getTeamWithLeastSpread } = require('./weather.js');

const fs = require('fs');
afterEach(() => jest.resetAllMocks());

describe('Weather', () => {
	test('Returns day with least temperature spread', async () => {
		const readFile = jest.spyOn(fs.promises, 'readFile').mockResolvedValue(`
Dy MxT   MnT   AvT   HDDay  AvDP 1HrP TPcpn WxType PDir AvSp Dir MxS SkyC MxR MnR AvSLP

1  88    59    74          53.8       0.00 F       280  9.6 270  17  1.6  93 23 1004.5
2  79    63    71          46.5       0.00         330  8.7 340  23  3.3  70 28 1004.5
		`);
		expect(await getDayWithLeastSpread('./weather.dat')).toStrictEqual('2');
		expect(readFile).toBeCalledWith('./weather.dat', 'utf-8');
	});
	test('Returns null for lack of data', async () => {
		const readFile = jest.spyOn(fs.promises, 'readFile').mockResolvedValue(`
Dy MxT   MnT   AvT   HDDay  AvDP 1HrP TPcpn WxType PDir AvSp Dir MxS SkyC MxR MnR AvSLP

`.trim());
		expect(await getDayWithLeastSpread('./weather.dat')).toBeNull();
		expect(readFile).toBeCalledWith('./weather.dat', 'utf-8');
	});
});

describe('Football', () => {
	it('Returns team with least score difference', async () => {
		const readFile = jest.spyOn(fs.promises, 'readFile').mockResolvedValue(`
		   Team            P     W    L   D    F      A     Pts
    1. Arsenal         38    26   9   3    79  -  36    87
    2. Liverpool       38    24   8   6    67  -  30    80
		`.trim());
		expect(await getTeamWithLeastSpread('./football.dat')).toStrictEqual('Liverpool');
		expect(readFile).toBeCalledWith('./football.dat', 'utf-8');
	});
	it('Returns null for lack of data', async () => {
		const readFile = jest.spyOn(fs.promises, 'readFile').mockResolvedValue(`
		   Team            P     W    L   D    F      A     Pts
		`.trim());
		expect(await getTeamWithLeastSpread('./football.dat')).toBeNull();
		expect(readFile).toBeCalledWith('./football.dat', 'utf-8');
	});
});