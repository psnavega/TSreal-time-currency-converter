import {
	listCurrencies,
	listCurrency,
	saveCurrency,
	updateCurrency,
	removeCurrency,
} from '../dao/CurrencyDao';
import type {CurrencyType} from '../interfaces/CurrencyType';

async function getCurrenciesService(): Promise<CurrencyType[]> {
	return listCurrencies();
}

async function getCurrencyService({code}: {code: string}): Promise<CurrencyType> {
	return listCurrency({code});
}

async function postCurrencyService(
	{
		body,
	}:
	{
		body: CurrencyType;
	}): Promise<CurrencyType> {
	return saveCurrency({body});
}

async function deleteCurrencyService({id}: {id: string}): Promise<CurrencyType> {
	return removeCurrency({id});
}

async function patchCurrencyService(
	{
		id,
		body,
	}: {
		id: string;
		body: CurrencyType;
	},
): Promise<CurrencyType> {
	return updateCurrency({id, body});
}

export {
	getCurrenciesService,
	getCurrencyService,
	postCurrencyService,
	patchCurrencyService,
	deleteCurrencyService,
};
