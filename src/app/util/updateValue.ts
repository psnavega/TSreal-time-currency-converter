import {patchCurrencyService} from '../services/CurrencyService';
import {getAPI} from './currency';

export async function updateValues({code}: {code: string}): Promise<void> {
	const body = await getAPI({code});

	await patchCurrencyService({code, body});
}
