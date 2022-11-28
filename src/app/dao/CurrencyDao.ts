import CurrencyModel from '../models/currency';
import type {CurrencyType} from '../interfaces/CurrencyType';

async function listCurrencies(): Promise<CurrencyType[]> {
	const response: CurrencyType[] = await CurrencyModel.find();

	return response;
}

async function listCurrency({code}: {code: string}): Promise<CurrencyType> {
	const response: CurrencyType = await CurrencyModel.findOne({code});

	return response;
}

async function saveCurrency({body}: {body: CurrencyType}): Promise<CurrencyType> {
	const newData = new CurrencyModel({
		name: body.name,
		code: body.code,
		rate: body.rate,
		fiat: body.fiat,
	});

	const response = await newData.save();

	return response;
}

async function removeCurrency({id}: {id: string}): Promise<CurrencyType> {
	const response = CurrencyModel.findByIdAndDelete(id);

	return response;
}

async function updateCurrency({
	id,
	body,
}: {
	id: string;
	body: CurrencyType;
}): Promise<CurrencyType> {
	const response = CurrencyModel.findByIdAndUpdate(id, body);

	return response;
}

export {
	listCurrencies,
	listCurrency,
	removeCurrency,
	updateCurrency,
	saveCurrency,
};
