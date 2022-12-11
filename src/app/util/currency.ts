import axios from 'axios';
import type {CurrencyType, EconomyType} from '../interfaces/CurrencyType';

export async function getAPI({code}: {code: string}): Promise<CurrencyType> {
	const data = await axios.get(`https://economia.awesomeapi.com.br/json/last/USD-${code}`);

	const response: CurrencyType = mountType(data.data[`USD${code}`]);

	return response;
}

function mountType(data: EconomyType): any {
	const nameFormated = data.name.split('/')[1];

	const response: CurrencyType = {
		name: nameFormated,
		code: data.codein,
		rate: Number(data.bid),
		fiat: true,
	};

	return response;
}
