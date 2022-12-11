
import {conversion} from '../services/ConversionService';
import type {Request, Response} from 'express';

export async function conversionCurrency(req: Request, res: Response): Promise<any> {
	const {query} = req;

	const data = {
		from: query.from as string,
		to: query.to as string,
		amount: query.amount as string,
	};

	const response = await conversion({data});

	res.json(response);
}
