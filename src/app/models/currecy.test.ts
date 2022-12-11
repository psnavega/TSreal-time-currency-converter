import currency from './currency';
import type {CurrencyType} from '../types/CurrencyType';

describe('Test properties', () => {
	test('if has all properties', () => {
		const currencyMock: CurrencyType = {
			name: 'PokeCoin',
			code: 'PKC',
			rate: 17.5,
			fiat: false,
		};

		expect(currencyMock.name).toEqual('PokeCoin');
		expect(currencyMock.code).toEqual('PKC');
		expect(currencyMock.rate).toEqual(17.5);
		expect(currencyMock.fiat).toEqual(false);
	},
	);
});
