import type {Document} from 'mongoose';
import {Schema, model} from 'mongoose';

type CurrencyType = {
	name: string;
	code: string;
	rate: number;
	fiatOrFic: boolean;
} & Document;

const currencySchema = new Schema({
	name: {
		type: String,
	},
	code: {
		type: String,
	},
	rate: {
		type: Number,
	},
	fiatOrFic: {
		type: Boolean,

	},
},
{
	timestamps: true,
},
);

export default model<CurrencyType>('Currency', currencySchema);
