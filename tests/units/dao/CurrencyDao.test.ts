
import {
    mockCurrency,
    mockCurrencyUpdated
} from '../../mocks/entitiesMock';
import { 
    listCurrency,
    saveCurrency,
    listCurrencies,
    removeCurrency,
    updateCurrencyRate
} from "../../../src/app/dao/CurrencyDao";
import { CurrencyType } from '../../../src/app/types/CurrencyType';

jest.mock('../../../src/app/dao/CurrencyDao');

afterEach(() => {
    jest.clearAllMocks();
});

describe('Test save a currency', () => {
    const saveCurrencyMock = saveCurrency as jest.Mock;

    saveCurrencyMock.mockImplementation(() => {
        return Promise.resolve(
            {
                ...mockCurrency,
                _id: 11111 as number,
                createdAt: new Date() as Date,
                updatedAt: new Date() as Date
            }
        );
    });
    it('Should simulate save a currencie at database', async () => {
        const response = await saveCurrencyMock({body: mockCurrency});

        await expect(saveCurrency).toHaveBeenCalled();
        await expect(response).toHaveProperty('name');
        await expect(response).toHaveProperty('code');
        await expect(response).toHaveProperty('fiat');
        await expect(response).toHaveProperty('name');
    });
});

describe('Test list all currencies', () => {
    const listCurrenciesMock = listCurrencies as jest.Mock;

    listCurrenciesMock.mockImplementation(() => {
        return Promise.resolve([{}]);
    });
    it('Should simulate get all currencies from database', async () => {
        const response = await listCurrenciesMock();

        await expect(listCurrencies).toHaveBeenCalled();
        await expect(response).toStrictEqual([{}]);
    });
});
// newMockToThrow
describe('Test list one currency', () => {
    const listCurrencyMock = listCurrency as jest.Mock;

    listCurrencyMock.mockImplementation((code) => {
        return Promise.resolve({});
    });
    it('Should simulate one currency from database', async () => {
        const response = await listCurrencyMock();

        await expect(listCurrency).toHaveBeenCalled();
        await expect(response).toStrictEqual({});
    });
});

describe('Test remove currency', () => {
    const removeCurrencyMock = removeCurrency as jest.Mock;

    removeCurrencyMock.mockImplementation(({code}: {code: string}) => {
        return Promise.resolve(
            {
                ...mockCurrency,
                _id: '1111',
                createdAt: new Date(),
                updatedAt: new Date(),
            })
    });
    it('Should remove one currency from database', async () => {
        const response = await removeCurrencyMock({code: mockCurrency.code});

        await expect(removeCurrency).toHaveBeenCalled();
        await expect(response).toHaveProperty('name');
        await expect(response).toHaveProperty('code');
        await expect(response).toHaveProperty('fiat');
        await expect(response).toHaveProperty('name');
        await expect(response).toHaveProperty('createdAt');
        await expect(response).toHaveProperty('updatedAt');
    });
});

describe('Test update currency', () => {
    const updateCurrencyRateMock = updateCurrencyRate as jest.Mock;

    updateCurrencyRateMock.mockImplementation(async ({body}: {body: CurrencyType}) => {
        const {code} = body;

        const register = Promise.resolve({
            ...mockCurrency,
            _id: '1111',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        (await register).rate = body.rate;
        (await register).name = body.name;

        return register;
    });

    it('Should update one currency from database', async () => {
        const response = await updateCurrencyRateMock({body: mockCurrencyUpdated});

        await expect(updateCurrencyRate).toHaveBeenCalled();
        await expect(response).toHaveProperty('_id');
        await expect(response).toHaveProperty('code');
        await expect(response).toHaveProperty('name');
        await expect(response).toHaveProperty('fiat');
        await expect(response).toHaveProperty('rate');
        await expect(response).toHaveProperty('createdAt');
        await expect(response).toHaveProperty('updatedAt');
        await expect(response.rate).toBe(mockCurrencyUpdated.rate);
        await expect(response.name).toBe(mockCurrencyUpdated.name);
    });
});