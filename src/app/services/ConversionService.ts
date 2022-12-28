import {
	listCurrency,
} from '../dao/CurrencyDao';
import { RequestError } from '../errors/RequestError';
import type {ConversionType} from '../types/types';
import {update} from '../util/currency';

export async function conversion({data}: {data: ConversionType}): Promise<ConversionType> {
	try{
		const dataRateFrom = await callRateFromDatabase({code: data.from});

		const dataRateTo = await callRateFromDatabase({code: data.to});

		if(!dataRateFrom || !dataRateTo) throw new RequestError(`Currency not exists at database`, 409); 

		const initialAmount = data.amount;

		const amountFinal = makeConversion({dataRateFrom, dataRateTo, initialAmount});

		const jsonConverted = {
			from: data.from,
			to: data.to,
			amount: amountFinal,
		};
		
		return jsonConverted;
	} catch(e: unknown) {
		throw e as RequestError;
	}	
}

async function callRateFromDatabase({code}: {code: string}): Promise<number> {
		const data = await listCurrency({code});

		if (!data) return;

		if (!data.fiat) return data.rate;

		const dataUpdated = await update({code});

		return dataUpdated.rate;
}

function makeConversion(
	{
		dataRateFrom,
		dataRateTo,
		initialAmount
	}: {
		dataRateFrom: number;
		dataRateTo: number;
		initialAmount: number | string
	}): number | string {
	const finalRate = Number((((dataRateFrom) / dataRateTo) * Number(initialAmount)).toFixed(2));

	return finalRate;
}
