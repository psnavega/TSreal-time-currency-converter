import {
    saveCurrency,
    listCurrencies,
    listCurrency,
    removeCurrency,
} from '../../src/app/dao/CurrencyDao';

jest.mock('../../src/app/dao/CurrencyDao');

const mockCurrency = {
    name: 'PokeCoin',
    code: 'PKC',
    rate: 123,
    fiat: false,
}

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
        const response = await saveCurrency({body: mockCurrency});

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

describe('Test list one currency', () => {
    const listCurrencyMock = listCurrency as jest.Mock;

    listCurrencyMock.mockImplementation(() => {
        return Promise.resolve({});
    });

    it('Should simulate one currency from database', async () => {
        const response = await listCurrencyMock();

        await expect(listCurrencyMock).toHaveBeenCalled();
        await expect(response).toStrictEqual({});
    });
});

describe('Test remove one currency', () => {
    const listCurrenciesMock = listCurrencies as jest.Mock;

    listCurrenciesMock.mockImplementation( () => {
        return Promise.resolve([{}]);
    });
    it('Should simulate remove one currency from database', async () => {
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