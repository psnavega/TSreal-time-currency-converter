import {
	listCurrencies,
	listCurrency,
	saveCurrency,
	removeCurrency,
} from '../dao/CurrencyDao';
import type {CurrencyType} from '../types/CurrencyType';
import {update} from '../util/currency';

async function getCurrenciesService(): Promise<CurrencyType[]> {
	try {
		return await listCurrencies();
	} catch (e: unknown) {
		console.error(e);
		throw e;
	}
}

async function getCurrencyService({code}: {code: string}): Promise<CurrencyType> {
	try {
		await update({code});

		return await listCurrency({code});
	} catch (e: unknown) {
		console.error(e);
		throw e;
	}
}

async function postCurrencyService(
	{
		body,
	}:
	{
		body: CurrencyType;
	}): Promise<CurrencyType> {
	try {
		return await saveCurrency({body});
	} catch (e: unknown) {
		console.error(e);
		throw e;
	}
}

async function deleteCurrencyService({code}: {code: string}): Promise<CurrencyType> {
	try {
		return await removeCurrency({code});
	} catch (e: unknown) {
		console.error(e);
		throw e;
	}
}

export {
	getCurrenciesService,
	getCurrencyService,
	postCurrencyService,
	deleteCurrencyService,
};
