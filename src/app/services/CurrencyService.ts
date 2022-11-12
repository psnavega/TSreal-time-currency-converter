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

async function getCurrencyService({id}: {id: string}): Promise<CurrencyType> {
	return listCurrency({id});
}

async function postCurrencyService(
	{
		data,
	}:
	{
		data: CurrencyType;
	}): Promise<CurrencyType> {
	return saveCurrency({data});
}

async function deleteCurrencyService({id}: {id: string}): Promise<CurrencyType> {
	return removeCurrency({id});
}

async function patchCurrencyService(
	{
		id,
		data,
	}: {
		id: string;
		data: CurrencyType;
	},
): Promise<CurrencyType> {
	return updateCurrency({id, data});
}

export {
	getCurrenciesService,
	getCurrencyService,
	postCurrencyService,
	patchCurrencyService,
	deleteCurrencyService,
};
