import CurrencyModel from '../models/currency';
import type {CurrencyType} from '../interfaces/CurrencyType';

async function listCurrencies(): Promise<CurrencyType[]> {
	const response: CurrencyType[] = await CurrencyModel.find();

	return response;
}

async function listCurrency({id}: {id: string}): Promise<CurrencyType> {
	const response: CurrencyType = await CurrencyModel.findById(id);

	return response;
}

async function saveCurrency({data}: {data: CurrencyType}): Promise<CurrencyType> {
	const newData = new CurrencyModel({
		name: data.name,
		code: data.code,
		rate: data.rate,
		fiatOrFic: data.fiatOrFic,
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
	data,
}: {
	id: string;
	data: CurrencyType;
}): Promise<CurrencyType> {
	const response = CurrencyModel.findByIdAndUpdate(id, data);

	return response;
}

export {
	listCurrencies,
	listCurrency,
	removeCurrency,
	updateCurrency,
	saveCurrency,
};
