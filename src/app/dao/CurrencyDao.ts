import CurrencyModel from '../models/currency';
import type {CurrencyType} from '../types/CurrencyType';
import {RequestError} from '../errors/RequestError';

async function listCurrencies(): Promise<CurrencyType[]> {
	try {
		const response: CurrencyType[] = await CurrencyModel.find();

		return response;
	} catch (e: unknown) {
		throw new RequestError();
	}
}

async function listCurrency({code}: {code: string}): Promise<CurrencyType> {
	try {
		const response: CurrencyType = await CurrencyModel.findOne({code});
		
		if(!response) return;
		
		return response;
	} catch (e: unknown) {
		throw new RequestError();
	}
}

async function saveCurrency({body}: {body: CurrencyType}): Promise<CurrencyType> {
	try {
		const newData = new CurrencyModel({
			name: body.name,
			code: body.code,
			rate: body.rate,
			fiat: body.fiat,
		});

		const response = await newData.save();

		return response;
	} catch (e: unknown) {
		throw new RequestError();
	}
}

async function updateCurrencyRate({body}: {body: CurrencyType}): Promise<CurrencyType> {
	try {
		const {code} = body;

		const register = await CurrencyModel.findOne({code}).exec();

		register.rate = body.rate;
		register.name = body.name;

		await register.save();

		return register;
	} catch (e: unknown) {
		throw new RequestError();
	}
}

async function removeCurrency({code}: {code: string}): Promise<CurrencyType> {
	try {
		const response = await CurrencyModel.findOneAndDelete({code});

		return response;
	} catch (e: unknown) {
		throw new RequestError();
	}
}

export {
	listCurrencies,
	listCurrency,
	removeCurrency,
	saveCurrency,
	updateCurrencyRate,
};
