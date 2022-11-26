import type {Request, Response} from 'express';
import type {CurrencyType} from '../interfaces/CurrencyType';
import {
	getCurrenciesService,
	getCurrencyService,
	postCurrencyService,
	patchCurrencyService,
	deleteCurrencyService,
} from '../services/CurrencyService';

async function getCurrencies(req: Request, res: Response): Promise<Response> {
	const response = await getCurrenciesService();

	return res.status(200).send(response);
}

async function getCurrency(req: Request, res: Response): Promise<Response> {
	const {id} = req.params;

	const response = await getCurrencyService({id});

	if (!response) {
		return res.status(400).send({message: 'No users registered'});
	}

	return res.status(200).send(response);
}

async function postCurrency(req: Request, res: Response): Promise<Response> {
	const {body}: {body: CurrencyType} = req;

	await postCurrencyService({body});

	return res.status(201).send({
		message: 'User created successfully',
		body,
	});
}

async function patchCurrency(req: Request, res: Response): Promise<Response> {
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
}

async function deleteCurrency(req: Request, res: Response): Promise<Response> {
	const {id} = req.params;

	const response = await deleteCurrencyService({id});

	if (!response) {
		return res.status(400).send({message: 'No register found to delete'});
	}

	return res.status(200).send({message: 'Deleted successfully', response});
}

export {
	getCurrencies,
	getCurrency,
	postCurrency,
	patchCurrency,
	deleteCurrency,
};
