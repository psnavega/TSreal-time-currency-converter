import {
	listCurrencies,
	listCurrency,
	saveCurrency,
	updateCurrency,
	removeCurrency,
} from '../dao/CurrencyDao';
import type {CurrencyType} from '../types/CurrencyType';
import {getAPI} from '../util/currency';

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

async function updateValues({code}: {code: string}): Promise<void> {
	const body = await getAPI({code});

	await patchCurrencyService({code, body});
}

export {
	getCurrenciesService,
	getCurrencyService,
	postCurrencyService,
	patchCurrencyService,
	deleteCurrencyService,
};
