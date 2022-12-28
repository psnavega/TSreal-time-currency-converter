/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {Request, Response} from 'express';
import type {CurrencyType} from '../types/types';
import {client} from '../database/redis';
import {
	getCurrenciesService,
	getCurrencyService,
	postCurrencyService,
	deleteCurrencyService,
} from '../services/CurrencyService';
import {currencyValidator} from '../validators/currency';

async function getCurrencies(req: Request, res: Response): Promise<Response> {
	try {
		const response = await client.get('getCurrencies');

		if (!response) {
			const response = await getCurrenciesService();

			await client.set('getCurrencies', JSON.stringify(response));
			await client.expire('getCurrencies', 10);

			return res.status(200).json({response});
		}

		return res.status(200).send(response);
	} catch (e: any) {
		const statusCode =  e.statusCode || 409;

		res.status(statusCode).send({error: e.message})
	}
}

async function getCurrency(req: Request, res: Response): Promise<Response> {
	try {
		const {code} = req.params;

		const response = await client.get(`${code}`);

		if (!response) {
			const response = await getCurrencyService({code});

			await client.set(
				`${code}`,
				JSON.stringify(
					response,
				),
			);
			await client.expire(`${code}`, 10);

			return res.status(200).send(response);
		}

		return res.status(200).send(response);
	} catch (e: any) {
		const statusCode =  e.statusCode || 409;

		res.status(statusCode).send({error: e.message})
	}
}

async function postCurrency(req: Request, res: Response): Promise<Response> {
	try {
		const {body}: {body: CurrencyType} = req;

		await currencyValidator.validate(body);

		await postCurrencyService({body});

		return res.status(201).send({
			message: 'Currency created successfully',
			body,
		});
	} catch (e: any) {
		const statusCode =  e.statusCode|| 409;

		res.status(statusCode).send({error: e.message})
	}
}

async function deleteCurrency(req: Request, res: Response): Promise<Response> {
	try {
		const {code} = req.params;

		const response = await deleteCurrencyService({code});

		if (!response) {
			return res.status(400).send({message: 'No register found to delete'});
		}

		return res.status(200).send({message: 'Deleted successfully', response});
	} catch (e: any) {
		const statusCode =  e.statusCode || 409;

		res.status(statusCode).send({error: e.message})
	}
}

export {
	getCurrencies,
	getCurrency,
	postCurrency,
	deleteCurrency,
};
