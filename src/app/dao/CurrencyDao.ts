import CurrencyModel from '../models/currency';
import type {CurrencyType} from '../types/CurrencyType';

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

async function removeCurrency({code}: {code: string}): Promise<CurrencyType> {
	const response = CurrencyModel.findOneAndDelete({code});

	return response;
}

async function updateCurrency({
	code,
	body,
}: {
	code: string;
	body: CurrencyType;
}): Promise<any> {
	const response = CurrencyModel.findOneAndUpdate({code}, body);

	return response;
}

export {
	listCurrencies,
	listCurrency,
	removeCurrency,
	updateCurrency,
	saveCurrency,
};
