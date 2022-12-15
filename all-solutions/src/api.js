require('dotenv').config();

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const POLYGON_API_KEY = process.env.POLYGON_API_KEY;

const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY;

const fetch = require('node-fetch');

async function fetchStockValue(symbol) {
	const url = new URL('https://www.alphavantage.co/query?');
	url.searchParams.append('function', 'GLOBAL_QUOTE');
	url.searchParams.append('apiKey', ALPHA_VANTAGE_API_KEY);
	url.searchParams.append('symbol', symbol.toUpperCase());
	const response = await fetch(url);
	const data = await response.json();
	/*
	Success: {
			"Global Quote": {
					"01. symbol": "IBM",
					"02. open": "147.4000",
					"03. high": "148.3400",
					"04. low": "146.9700",
					"05. price": "147.0500",
					"06. volume": "3047581",
					"07. latest trading day": "2022-12-09",
					"08. previous close": "147.7800",
					"09. change": "-0.7300",
					"10. change percent": "-0.4940%"
			}
	}
	Failures:
	{
			"Global Quote": {}
	}
	{
			"Note": "Error Message"
	}
	*/
	if ('Note' in data) throw new Error(`API Error: ${data['Note']}`);

	const price = data['Global Quote']?.['05. price'];
	if (price === undefined) throw new Error(`Invalid stock symbol: ${symbol}`);

	return +price;
}

async function fetchPolygonStockValue(symbol) {
	const url = new URL(`https://api.polygon.io/v2/aggs/ticker/${symbol}/prev`);
	url.searchParams.append('apiKey', POLYGON_API_KEY);
	url.searchParams.append('adjusted', true);
	const response = await fetch(url);
	const data = await response.json();
	/*
	Success: {
		"ticker": "AAPL",
		"queryCount": 1,
		"resultsCount": 1,
		"adjusted": true,
		"results": [
			{
				"T": "AAPL",
				"v": 76084511,
				"vw": 143.2204,
				"o": 142.34,
				"c": 142.16,
				"h": 145.57,
				"l": 140.9,
				"t": 1670619600000,
				"n": 530236
			}
		],
		"status": "OK",
		"request_id": "8a1fd07d0542a977436df1c7b8742061",
		"count": 1
	}
	Failures:
	{
		"ticker": "GOOFG",
		"queryCount": 0,
		"resultsCount": 0,
		"adjusted": true,
		"status": "OK",
		"request_id": "da9933b59e524d2d5360795e6713e396"
	}
	{
		"status": "ERROR",
		"request_id": "94c38ac188e950738dbad64f0143e410",
		"error": "Unknown API Key"
	}
	*/
	if (data.status !== 'OK') throw new Error(`API Error: ${data.error}`);
	if (!data.resultsCount) throw new Error('Invalid stock symbol: ' + symbol);

	return data.results[0].c;
}

async function fetchExchangeRate(from, to) {
	from = from.toUpperCase();
	to = to.toUpperCase();
	const response = await fetch(`https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/latest/${from}`);
	/*
	Success: {
			"result": "success",
			"documentation": "https://www.exchangerate-api.com/docs",
			"terms_of_use": "https://www.exchangerate-api.com/terms",
			"time_last_update_unix": 1670630401,
			"time_last_update_utc": "Sat, 10 Dec 2022 00:00:01 +0000",
			"time_next_update_unix": 1670716801,
			"time_next_update_utc": "Sun, 11 Dec 2022 00:00:01 +0000",
			"base_code": "USD",
			"conversion_rates": {
					"USD": 1,
					"AED": 3.6725,
			}
	}
	Failure: {
			"result": "error",
			"documentation": "https://www.exchangerate-api.com/docs",
			"terms-of-use": "https://www.exchangerate-api.com/terms",
			"error-type": "unsupported-code"
	}
	*/
	const data = await response.json();
	if (data.result === 'error') {
		if (data['error-type'] === 'unsupported-code') throw new Error(`Origin currency '${from}' does not exist`);
		throw new Error(`API Error: ${data['error-type']}`);
	}

	const rate = data.conversion_rates[to];
	if (rate === undefined) throw new Error(`Target currency '${to}' does not exist`);

	return rate;
}

async function logAllRepoURLs(type, name, filter = () => true){
	const response = await fetch(`https://api.github.com/${type}s/${name}/repos`);
	const data = await response.json();
	/*
	Success: [
		{
			"id": 1665264,
			"node_id": "MDEwOlJlcG9zaXRvcnkxNjY1MjY0",
			"name": "beanoh",
			"full_name": "sourceallies/beanoh",
			"private": false,
			"owner": {
				"login": "sourceallies",
				"id": 752475,
				"avatar_url": "https://avatars.githubusercontent.com/u/752475?v=4",
				"gravatar_id": "",
				"url": "https://api.github.com/users/sourceallies",
				"html_url": "https://github.com/sourceallies",
				"type": "Organization",
				"site_admin": false
			},
			"html_url": "https://github.com/sourceallies/beanoh",
			"description": "Provides quick feedback on your Spring wiring.  Furthermore, it reconciles available components with the Spring context.",
			"created_at": "2011-04-26T14:03:44Z",
			"updated_at": "2017-11-06T10:20:36Z",
			"pushed_at": "2017-02-19T23:29:45Z",
		},
	]
	Failures:
	{
		"message": "Not Found",
		"documentation_url": "https://docs.github.com/rest"
	}
	{
		"message": "Not Found",
		"documentation_url": "https://docs.github.com/rest/reference/repos#list-repositories-for-a-user"
	}
	*/
	if (data.message) {
		return console.error(`${data.message} (${data.documentation_url})`);
	}

	for (const repo of data){
		if (filter(repo)) console.log(`${repo.name} @ ${repo.html_url}`);
	}
}

module.exports = {
	fetchStockValue, fetchExchangeRate, logAllRepoURLs, fetchPolygonStockValue
};
