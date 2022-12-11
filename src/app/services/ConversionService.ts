import {
	listCurrency,
} from '../dao/CurrencyDao';
import type {ConversionType} from '../types/CurrencyType';
import {updateValues} from '../util/updateValue';

export async function conversion({data}: {data: ConversionType}): Promise<ConversionType> {
	const dataRateFrom = await callRateFromDatabase({code: data.from});

	const dataRateTo = await callRateFromDatabase({code: data.to});

	const initialAmount = data.amount;

	const amountFinal = makeConversion({dataRateFrom, dataRateTo, initialAmount});

	const jsonConverted = {
		to: data.to,
		from: data.from,
		amount: amountFinal,
	};

	return jsonConverted;
}

async function callRateFromDatabase({code}: {code: string}): Promise<number> {
	await updateValues({code});

	const data = await listCurrency({code});
	return data.rate;
}

function makeConversion({dataRateFrom, dataRateTo, initialAmount}: {dataRateFrom: number; dataRateTo: number; initialAmount: number | string}): number | string {
	const finalRate = Number((((dataRateFrom) / dataRateTo) * Number(initialAmount)).toFixed(2));

	return finalRate;
}

