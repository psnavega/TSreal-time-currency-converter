/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {Request, Response} from 'express';
import type {CurrencyType} from '../interfaces/CurrencyType';
import {client} from '../database/redis';
import {
	getCurrenciesService,
	getCurrencyService,
	postCurrencyService,
	patchCurrencyService,
	deleteCurrencyService,
} from '../services/CurrencyService';

async function getCurrencies(req: Request, res: Response): Promise<Response> {
	try {
		const response = await client.get('getCurrencies');

		if (!response) {
			const response = await getCurrenciesService();

			await client.set('getCurrencies', JSON.stringify(response));
			await client.expire('getCurrencies', 20);

			return res.status(200).send({response});
		}

		return res.status(200).send({response});
	} catch (e: unknown) {
		return res.status(409).send({
			message: 'Error',
			description: e,
		});
	}
}

async function getCurrency(req: Request, res: Response): Promise<Response> {
	try {
		const {id} = req.params;

		const response = await getCurrencyService({id});

		if (!response) {
			return res.status(400).send({message: 'No users registered'});
		}

		return res.status(200).send(response);
	} catch (e: unknown) {
		return res.status(409).send({
			message: 'Error',
			description: e,
		});
	}
}

async function postCurrency(req: Request, res: Response): Promise<Response> {
	try {
		const {body}: {body: CurrencyType} = req;

		await postCurrencyService({body});

		return res.status(201).send({
			message: 'User created successfully',
			body,
		});
	} catch (e: unknown) {
		return res.status(409).send({
			message: 'Error',
			description: e,
		});
	}
}

async function patchCurrency(req: Request, res: Response): Promise<Response> {
	try {
		const {id} = req.params;

		const {body}: {body: CurrencyType} = req;

		const response = await patchCurrencyService({id, body});

		if (!response) {
			return res.status(400).send({message: 'No register found to update'});
		}

		return res.status(200).send({
			message: 'Update successfully',
			body,
		});
	} catch (e: unknown) {
		return res.status(409).send({
			message: 'Error',
			description: e,
		});
	}
}

async function deleteCurrency(req: Request, res: Response): Promise<Response> {
	try {
		const {id} = req.params;

		const response = await deleteCurrencyService({id});

		if (!response) {
			return res.status(400).send({message: 'No register found to delete'});
		}

		return res.status(200).send({message: 'Deleted successfully', response});
	} catch (e: unknown) {
		return res.status(409).send({
			message: 'Error',
			description: e,
		});
	}
}

export {
	getCurrencies,
	getCurrency,
	postCurrency,
	patchCurrency,
	deleteCurrency,
};
