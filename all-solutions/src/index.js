const { fetchStockValue, fetchExchangeRate } = require('./api.js');

/*
make a wallet. That wallet has stocks in it. Get the total value of that wallet
throw exception if stock value is not in the cache
convert to other currencies
get current stock prices from API
*/

// class WalletManager {
// 	constructor(initialStockValues = {}, initialCurrencyRates = {}, originCurrency = 'USD') {
// 		this._stockValues = initialStockValues;
// 		this._currencyConversionRates = {
// 			...initialCurrencyRates,
// 			[originCurrency]: 1
// 		};
// 		this._originCurrency = originCurrency;
// 	}

// 	async getWalletTotal(wallet, currency = this._originCurrency, offline = false) {
// 		currency = currency.toUpperCase();

// 		if (typeof wallet !== 'object') throw new Error(`Wallet argument must be of type object, not '${typeof wallet}'`);

// 		let usdTotal = 0;
// 		for (const [name, count] of Object.entries(wallet)) {
// 			let stockValue = this._stockValues[name];
// 			if (!stockValue) {
// 				if (offline) throw new Error(`Stock price for '${name}' is not cached`);
// 				stockValue = this._stockValues[name] = await fetchStockValue(name);
// 			}

// 			usdTotal += count * stockValue;
// 		}

// 		if (!(currency in this._currencyConversionRates)) {
// 			if (offline) throw new Error(`Conversion rate to '${currency}' is not cached`);
// 			this._currencyConversionRates[currency] = await fetchExchangeRate(this._originCurrency, currency);
// 		}

// 		return usdTotal * this._currencyConversionRates[currency];
// 	}

// 	static getWalletTotal(wallet, currency, offline = false) {
// 		return new WalletManager().getWalletTotal(wallet, currency, offline);
// 	}
// }


async function getWalletTotal(wallet, stockValues = {}, currencyRates = {}, currency = 'USD', offline = false) {
	currency = currency.toUpperCase();

	if (typeof wallet !== 'object') throw new Error(`Wallet argument must be of type object, not '${typeof wallet}'`);

	let usdTotal = 0;
	for (const [name, count] of Object.entries(wallet)) {
		let stockValue = stockValues[name];
		if (!stockValue) {
			if (offline) throw new Error(`Stock price for '${name}' is not cached`);
			stockValue = stockValues[name] = await fetchStockValue(name);
		}

		usdTotal += count * stockValue;
	}

	if (!(currency in currencyRates)) {
		if (offline) throw new Error(`Conversion rate to '${currency}' is not cached`);
		currencyRates[currency] = await fetchExchangeRate('USD', currency);
	}
	return usdTotal * (currencyRates[currency] || 1);
}

module.exports = {
	WalletManager,
	getWalletTotal
};