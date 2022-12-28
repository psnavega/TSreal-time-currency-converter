import {mockCurrency} from '../../mocks/entitiesMock';
import {RequestError} from '../../../src/app/errors/RequestError';
import {
	getCurrenciesService,
	getCurrencyService,
	postCurrencyService,
	deleteCurrencyService,
} from '../../../src/app/services/CurrencyService';
import { listCurrencies, listCurrency, removeCurrency, saveCurrency } from '../../../src/app/dao/CurrencyDao';
import { update } from '../../../src/app/util/currency';
import { CurrencyType } from 'src/app/types/types';

jest.mock('../../../src/app/services/CurrencyService');
jest.mock('../../../src/app/dao/CurrencyDao');
jest.mock('../../../src/app/util/currency');

beforeEach(() => {
    jest.clearAllMocks();
});

const listCurrenciesMock = listCurrencies as jest.Mock; 

listCurrenciesMock.mockImplementation(() => {
	return Promise.resolve([{}]);
});

const getCurrenciesServiceMock = getCurrenciesService as jest.Mock;

const listCurrencyMock = listCurrency as jest.Mock; 

const updateMock = update as jest.Mock;

const getCurrencyServiceMock = getCurrencyService as jest.Mock;

const postCurrencyServiceMock = postCurrencyService as jest.Mock;

const saveCurrencyMock = saveCurrency as jest.Mock;

const deleteCurrencyServiceMock = deleteCurrencyService as jest.Mock;

const removeCurrencyMock = removeCurrency as jest.Mock;

describe('Test get all currencies from dao', () => {
	getCurrenciesServiceMock.mockImplementation(() => { 
		return Promise.resolve(listCurrenciesMock()); 
	});

    it('Should return sucessfully currency service', async () => {
		const response = await getCurrenciesServiceMock();

		expect(getCurrenciesService).toBeCalledTimes(1);
		expect(listCurrencies).toBeCalledTimes(1);
		await expect(response).toEqual([{}]);
	});	
});

describe('Test get one currency from dao', () => {
	getCurrencyServiceMock.mockImplementation(({code}: {code: string}) => {
		Promise.resolve(updateMock({code}));

		return Promise.resolve(listCurrencyMock(code));
	})

	it('should call dao function, call update function and return one currency', async() => {
		getCurrencyServiceMock({code: 'PKC'});
		
		await expect(getCurrencyService).toBeCalled();
		await expect(listCurrency).toBeCalled();
		await expect(update).toBeCalled();
	})
});

describe('Test if post to dao save a new currency', () => {
	postCurrencyServiceMock.mockImplementation(({body}: {body: CurrencyType}) => {
		return Promise.resolve(saveCurrencyMock({body}));
	});

	it('should call dao function and save receive return', async() => {
		postCurrencyServiceMock({mockCurrency});

		await expect(postCurrencyService).toBeCalled();
		// await expect(saveCurrency).toBeCalled();
	});
});

describe('Test if delete to dao save a new currency', () => {
	deleteCurrencyServiceMock.mockImplementation(({code}: {code: CurrencyType}) => {
		return Promise.resolve(removeCurrencyMock({code}));
	});

	it('should call dao function and save receive return', async() => {
		deleteCurrencyServiceMock({mockCurrency});

		await expect(deleteCurrencyService).toBeCalled();
		await expect(removeCurrency).toBeCalled();
	});
});
