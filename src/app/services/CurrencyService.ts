import {
	listCurrencies,
	listCurrency,
	saveCurrency,
	updateCurrency,
	removeCurrency,
} from '../dao/CurrencyDao';
import type {CurrencyType} from '../types/CurrencyType';
import {updateValues} from '../util/updateValue';

async function getCurrenciesService(): Promise<CurrencyType[]> {
	return listCurrencies();
}

async function getCurrencyService({code}: {code: string}): Promise<CurrencyType> {
	await updateValues({code});

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

async function deleteCurrencyService({code}: {code: string}): Promise<CurrencyType> {
	return removeCurrency({code});
}

async function patchCurrencyService(
	{
		code,
		body,
	}: {
		code: string;
		body: CurrencyType;
	},
): Promise<any> {
	return updateCurrency({code, body});
}

export {
	getCurrenciesService,
	getCurrencyService,
	postCurrencyService,
	patchCurrencyService,
	deleteCurrencyService,
};
