import {mockCurrency} from '../../mocks/allMocks';
import {RequestError} from '../../../src/app/errors/RequestError';
import {
	getCurrenciesService,
	getCurrencyService,
	postCurrencyService,
	deleteCurrencyService,
} from '../../../src/app/services/CurrencyService';
import { listCurrencies } from '../../../src/app/dao/CurrencyDao';

jest.mock('../../../src/app/services/CurrencyService');
jest.mock('../../../src/app/dao/CurrencyDao');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Test get currencies from dao', () => {
	const getCurrenciesServiceMock = getCurrenciesService as jest.Mock;

	const listCurrenciesMock = listCurrencies as jest.Mock; 

	getCurrenciesServiceMock.mockImplementation(() => { 
		listCurrenciesMock();

		return Promise.resolve(
			{
				...mockCurrency
			}
		);
	});

    it('Should return sucessfully currency service', async () => {
		const response = await getCurrenciesServiceMock();

		expect(getCurrenciesService).toBeCalledTimes(1);
		expect(listCurrencies).toBeCalledTimes(1);
		expect(response).toHaveProperty('name');
		expect(response).toHaveProperty('code');
		expect(response).toHaveProperty('fiat');
		expect(response).toHaveProperty('rate');
	});	
});