
const dotenv = require('dotenv');
jest.mock('dotenv');
dotenv.config.mockImplementation(() => {
	process.env.ALPHA_VANTAGE_API_KEY = 'test-alpha-vantage-api-key';
	process.env.EXCHANGE_RATE_API_KEY = 'test-exchange-rate-api-key';
	process.env.POLYGON_API_KEY = 'test-polygon-api-key';
});

const fetch = require('node-fetch');
jest.mock('node-fetch');

const { fetchStockValue, fetchExchangeRate, fetchPolygonStockValue, logAllRepoURLs } = require('./api.js');

const mockFetchJSONResponse = json => fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(json) });

afterEach(() => jest.resetAllMocks());

describe('fetchStockValue', () => {
	test('Return price', async () => {
		const mockedFetch = mockFetchJSONResponse({
			'Global Quote': {
				'05. price': '123.456',
			}
		});
		expect(await fetchStockValue('GOOG')).toStrictEqual(123.456);
		expect(mockedFetch).toHaveBeenCalledWith(new URL('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apiKey=test-alpha-vantage-api-key&symbol=GOOG'));
	});
	test('Rejects for invalid symbol', async () => {
		mockFetchJSONResponse({
			'Global Quote': {}
		});
		await expect(fetchStockValue('GOOG'))
			.rejects.toThrowError('Invalid stock symbol: GOOG');
	});
	test('Rejects for API errors', async () => {
		mockFetchJSONResponse({
			Note: 'Api Error Message'
		});
		await expect(fetchStockValue('GOOG'))
			.rejects.toThrowError('API Error: Api Error Message');
	});
});

describe('fetchExchangeRate', () => {
	test('Returns rate', async () => {
		const mockedFetch = mockFetchJSONResponse({
			result: 'success',
			conversion_rates: {
				USD: 1,
				AED: 3.6725,
			}
		});
		expect(await fetchExchangeRate('USD', 'AED')).toStrictEqual(3.6725);
		expect(mockedFetch).toHaveBeenCalledWith('https://v6.exchangerate-api.com/v6/test-exchange-rate-api-key/latest/USD');
	});
	test('Rejects for invalid origin currencies', async () => {
		mockFetchJSONResponse({
			result: 'error',
			'error-type': 'unsupported-code'
		});
		await expect(fetchExchangeRate('USD', 'AED'))
			.rejects.toThrowError('Origin currency \'USD\' does not exist');
	});
	test('Rejects for invalid target currencies', async () => {
		mockFetchJSONResponse({
			result: 'success',
			conversion_rates: {
				USD: 1
			}
		});
		await expect(fetchExchangeRate('USD', 'AED'))
			.rejects.toThrowError('Target currency \'AED\' does not exist');
	});
	test('Rejects for API errors', async () => {
		mockFetchJSONResponse({
			result: 'error',
			'error-type': 'random-code'
		});
		await expect(fetchExchangeRate('USD', 'AED'))
			.rejects.toThrowError('API Error: random-code');
	});
});

describe('logAllRepoURLs', () => {
	it('logs all repo URLs by default', async () => {
		const log = jest.spyOn(console, 'log');
		const mockedFetch = mockFetchJSONResponse([{
			name: 'repo',
			html_url: 'https://rascaltwo.com'
		}]);
		await logAllRepoURLs('user', 'RascalTwo');
		expect(log.mock.calls).toEqual([ [ 'repo @ https://rascaltwo.com' ] ]);
		expect(mockedFetch).toHaveBeenCalledWith('https://api.github.com/users/RascalTwo/repos');
	});
	it('logs errors', async () => {
		const error = jest.spyOn(console, 'error');
		mockFetchJSONResponse({
			message: 'bad',
			documentation_url: 'https://rascaltwo.com'
		});
		await logAllRepoURLs('user', 'RascalTwo');
		expect(error.mock.calls).toEqual([ [ 'bad (https://rascaltwo.com)' ] ]);
	});
});

describe('fetchPolygonStockValue', () => {
	test('Returns price', async () => {
		const mockedFetch = mockFetchJSONResponse({
			status: 'OK',
			resultsCount: 1,
			results: [{
				c: 123
			}]
		});
		await expect(fetchPolygonStockValue('ABC')).resolves.toBe(123);
		expect(mockedFetch).toHaveBeenCalledWith(new URL('https://api.polygon.io/v2/aggs/ticker/ABC/prev?apiKey=test-polygon-api-key&adjusted=true'));
	});
	test('Rejects for invalid symbol', async () => {
		mockFetchJSONResponse({
			status: 'OK',
			resultsCount: 0,
		});
		await expect(fetchPolygonStockValue('ABC')).rejects.toThrowError('Invalid stock symbol: ABC');
	});
	test('Rejects for API errors', async () => {
		mockFetchJSONResponse({
			status: 'ERROR',
			error: 'bad stuff',
		});
		await expect(fetchPolygonStockValue('ABC')).rejects.toThrowError('API Error: bad stuff');
	});
});
