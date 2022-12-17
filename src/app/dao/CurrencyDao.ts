import CurrencyModel from '../models/currency';
import type {CurrencyType} from '../types/CurrencyType';

async function listCurrencies(): Promise<CurrencyType[]> {
	try {
		const response: CurrencyType[] = await CurrencyModel.find();

		return response;
	} catch (e: unknown) {
		console.error(e);
		throw e;
	}
}

async function listCurrency({code}: {code: string}): Promise<CurrencyType> {
	try {
		const response: CurrencyType = await CurrencyModel.findOne({code}).exec();

		return response;
	} catch (e: unknown) {
		console.error(e);
		throw e;
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
		console.error(e);
		throw e;
	}
}

async function updateCurrencyRate({body}: {body: CurrencyType}): Promise<CurrencyType> {
	try {
		const {code} = body;

		const register = await CurrencyModel.findOne({code}).exec() as CurrencyType;

		register.rate = body.rate;
		register.name = body.name;

		return register;
	} catch (e: unknown) {
		console.error(e);
		throw e;
	}
}

async function removeCurrency({code}: {code: string}): Promise<CurrencyType> {
	try {
		const response = await CurrencyModel.findOneAndDelete({code});

		return response;
	} catch (e: unknown) {
		console.error(e);
		throw e;
	}
}

export {
	listCurrencies,
	listCurrency,
	removeCurrency,
	saveCurrency,
	updateCurrencyRate,
};
