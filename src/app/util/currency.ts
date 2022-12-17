import axios from 'axios';
import type {CurrencyType, EconomyType} from '../types/CurrencyType';
import {updateCurrencyRate} from '../dao/CurrencyDao';
import { RequestError } from '../errors/RequestError';

export async function update({code}: {code: string}): Promise<CurrencyType> {
	try {
		const data = await axios.get(`https://economia.awesomeapi.com.br/json/last/USD-${code}`);

		if(!data) throw new RequestError('Invalid currency', 409);

		const response = await mountType(data.data[`USD${code}`]);

		return response;
	} catch (e: unknown) {
		console.error(e);
		throw e;
	}
}

async function mountType(data: EconomyType): Promise<CurrencyType> {
	const nameFormated = data.name.split('/')[1];

	const body: CurrencyType = {
		name: nameFormated,
		code: data.codein,
		rate: Number(data.bid),
		fiat: true,
	};

	const response = await updateCurrencyRate({body});

	return response;
}

