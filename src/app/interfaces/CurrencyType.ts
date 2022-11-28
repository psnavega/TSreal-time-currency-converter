import type {ObjectId} from 'mongoose';

export type CurrencyType = {
	_id?: ObjectId;
	name: string;
	code: string;
	rate: number;
	fiat: boolean;
};

export type EconomyType = {
	code: string;
	codein: string;
	name: string;
	high: string;
	low: string;
	varBid: string;
	bid: number;
	ask: string;
	timestamp: string;
	create_date: string;
};
