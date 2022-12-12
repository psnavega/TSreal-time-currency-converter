import type {Document} from 'mongoose';
import {Schema, model} from 'mongoose';

type CurrencyType = {
	name: string;
	code: string;
	rate: number;
	fiat: boolean;
} & Document;

const currencySchema = new Schema({
	name: {
		type: String,
		require: true,
	},
	code: {
		type: String,
		require: true,
	},
	rate: {
		type: Number,
		require: true,
	},
	fiat: {
		type: Boolean,
		require: true,
	},
},
{
	timestamps: true,
},
);

export default model<CurrencyType>('Currency', currencySchema);
