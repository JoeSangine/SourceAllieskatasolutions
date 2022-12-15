const { WalletManager, getWalletTotal } = require('./index.js');
const api = require('./api.js');

jest.mock('./api');

afterEach(() => jest.resetAllMocks());

describe('WalletManager', () => {
	
	test('uses initial cache values', async () => {
		const manager = new WalletManager({ abc: 123 }, { DEF: 4.56 }, 'GHI');
		expect(await manager.getWalletTotal({ abc: 1 }, 'DEF')).toStrictEqual(560.88);
	});

	describe('getWalletTotal', () => {

		test('Returns sum of empty wallet as 0', async () => {
			expect(await WalletManager.getWalletTotal({})).toStrictEqual(0);
		});

		test('Rejects on non-object wallet arguments', async () => {
			await expect(WalletManager.getWalletTotal())
				.rejects.toThrowError('Wallet argument must be of type object, not \'undefined\'');
		});

		describe('offline mode', () => {

			test('Rejects for missing stock price', async () => {
				await expect(WalletManager.getWalletTotal({ abc: 1 }, undefined, true))
					.rejects.toThrowError('Stock price for \'abc\' is not cached');
			});

			test('Rejects for missing conversion rate', async () => {
				await expect(WalletManager.getWalletTotal({}, 'EUR', true))
					.rejects.toThrowError('Conversion rate to \'EUR\' is not cached');
			});

		});

	});

	test('caches stock values', async () => {
		const mockedfetchStockValue = api.fetchStockValue.mockResolvedValue(124.0);
		const manager = new WalletManager(undefined, { DEF: 4.56 }, 'GHI');
		expect(await manager.getWalletTotal({ abc: 1 }, 'DEF')).toBeCloseTo(565.439, 2);
		expect(mockedfetchStockValue).toBeCalledWith('abc');
		mockedfetchStockValue.mockClear();

		expect(mockedfetchStockValue).not.toBeCalled();
		expect(await manager.getWalletTotal({ abc: 1 }, 'DEF')).toBeCloseTo(565.439, 2);
		expect(mockedfetchStockValue).not.toBeCalled();
	});

	test('caches currenty rates', async () => {
		const mockedFetchExchangeRate = api.fetchExchangeRate.mockResolvedValue(3.6725);
		const manager = new WalletManager({ abc: 123 }, undefined, 'GHI');
		expect(await manager.getWalletTotal({ abc: 1 }, 'DEF')).toBeCloseTo(451.7175, 2);
		expect(mockedFetchExchangeRate).toBeCalledWith('GHI', 'DEF');
		mockedFetchExchangeRate.mockClear();
		expect(mockedFetchExchangeRate).not.toBeCalled();
		expect(await manager.getWalletTotal({ abc: 1 }, 'DEF')).toBeCloseTo(451.7175, 2);
		expect(mockedFetchExchangeRate).not.toBeCalled();
	});
});

describe('getWalletTotal', () => {
	
	test('uses initial cache values', async () => {
		expect(await getWalletTotal({ abc: 1 }, { abc: 123 }, { DEF: 4.56 }, 'DEF')).toStrictEqual(560.88);
	});

	describe('getWalletTotal', () => {

		test('Returns sum of empty wallet as 0', async () => {
			expect(await getWalletTotal({})).toStrictEqual(0);
		});

		test('Rejects on non-object wallet arguments', async () => {
			await expect(getWalletTotal())
				.rejects.toThrowError('Wallet argument must be of type object, not \'undefined\'');
		});

		describe('offline mode', () => {

			test('Rejects for missing stock price', async () => {
				await expect(getWalletTotal({ abc: 1 }, {}, {}, 'USD', true))
					.rejects.toThrowError('Stock price for \'abc\' is not cached');
			});

			test('Rejects for missing conversion rate', async () => {
				await expect(getWalletTotal({}, {}, {}, 'EUR', true))
					.rejects.toThrowError('Conversion rate to \'EUR\' is not cached');
			});

		});

	});

	test('caches stock values', async () => {
		const mockedfetchStockValue = api.fetchStockValue.mockResolvedValue(124.0);
		const stockValues = {};
		expect(await getWalletTotal({ abc: 1 }, stockValues, { DEF: 4.56 }, 'DEF')).toBeCloseTo(565.439, 2);
		expect(mockedfetchStockValue).toBeCalledWith('abc');
		mockedfetchStockValue.mockClear();

		expect(mockedfetchStockValue).not.toBeCalled();
		expect(await getWalletTotal({ abc: 1 }, stockValues, { DEF: 4.56 }, 'DEF')).toBeCloseTo(565.439, 2);
		expect(mockedfetchStockValue).not.toBeCalled();
	
		expect(stockValues).toEqual({
			abc: 124
		});
	});

	test('caches currenty rates', async () => {
		const mockedFetchExchangeRate = api.fetchExchangeRate.mockResolvedValue(3.6725);
		const currencyRates = {};
		expect(await getWalletTotal({ abc: 1 }, { abc: 123 }, currencyRates, 'DEF')).toBeCloseTo(451.7175, 2);
		expect(mockedFetchExchangeRate).toBeCalledWith('USD', 'DEF');
		mockedFetchExchangeRate.mockClear();
		
		expect(mockedFetchExchangeRate).not.toBeCalled();
		expect(await getWalletTotal({ abc: 1 }, { abc: 123 }, currencyRates, 'DEF')).toBeCloseTo(451.7175, 2);
		expect(mockedFetchExchangeRate).not.toBeCalled();

		expect(currencyRates).toEqual({
			DEF: 3.6725
		});
	});
});