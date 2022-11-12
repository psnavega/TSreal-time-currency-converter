import currency from './currency';
import type {CurrencyType} from '../interfaces/CurrencyType';

describe('Test properties', () => {
	test('if has all properties', () => {
		const currencyMock: CurrencyType = {
			name: 'PokeCoin',
			code: 'PKC',
			rate: 17.5,
			fiatOrFic: false,
		};

		expect(currencyMock.name).toEqual('PokeCoin');
		expect(currencyMock.code).toEqual('PKC');
		expect(currencyMock.rate).toEqual(17.5);
		expect(currencyMock.fiatOrFic).toEqual(false);
	},
	);
});
