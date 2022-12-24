import { CurrencyType } from 'src/app/types/CurrencyType';
import {
    saveCurrency,
    listCurrencies,
    listCurrency,
    removeCurrency,
    updateCurrencyRate,
} from '../../../src/app/dao/CurrencyDao';
import {
    mockCurrency
} from '../../mocks/allMocks';
 
jest.mock('../../../src/app/dao/CurrencyDao');

const listCurrencyMock = listCurrency as jest.Mock;

listCurrencyMock.mockImplementation(() => {
    return Promise.resolve({});
});


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

        await expect(listCurrenciesMock).toHaveBeenCalled();
        await expect(response).toStrictEqual([{}]);
    });
});
// newMockToThrow
describe('Test list one currency', () => {
    it('Should simulate one currency from database', async () => {
        const response = await listCurrencyMock();

        await expect(listCurrencyMock).toHaveBeenCalled();
        await expect(response).toStrictEqual({});
    });
});

describe('Test list one currency', () => {
    const listCurrenciesMock = listCurrencies as jest.Mock;

    listCurrenciesMock.mockImplementation( () => {
        return Promise.resolve([{}]);
    });
    it('Should list all currencies from database', async () => {
        const response = await listCurrenciesMock();

        await expect(listCurrenciesMock).toHaveBeenCalled();
        await expect(response).toStrictEqual([{}]);
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

        await expect(removeCurrencyMock).toHaveBeenCalled();
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
        const code = mockCurrency.code;

        const response = await listCurrencyMock(code);

        return Promise.resolve({
            ...mockCurrency,
                _id: '1111',
                createdAt: new Date(),
                updatedAt: new Date(),
        })
    });
    it('Should update one currency from database', async () => {

        const response = await updateCurrencyRateMock({code: mockCurrency.code});

        await expect(updateCurrencyRate).toHaveBeenCalled();
        await expect(listCurrency).toHaveBeenCalledTimes(1);
        await expect(response).toHaveProperty('_id');
        await expect(response).toHaveProperty('code');
        await expect(response).toHaveProperty('name');
        await expect(response).toHaveProperty('fiat');
        await expect(response).toHaveProperty('rate');
        await expect(response).toHaveProperty('createdAt');
        await expect(response).toHaveProperty('updatedAt');
    });
});