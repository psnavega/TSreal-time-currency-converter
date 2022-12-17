import { ValidationError } from 'yup';
import {currencyValidator} from '../../src/app/validators/currency'

describe('Test currency validators', () => {
	const currencyMock = {
		name: 'PokeCoin',
		code: 'PKC',
		rate: 17.5,
		fiat: true,
	};

	it('should has all properties', async () => {
		const response = await currencyValidator.validate(currencyMock)
		expect(response).toHaveProperty(['name']);
		expect(response).toHaveProperty(['code']);
		expect(response).toHaveProperty(['rate']);
		expect(response).toHaveProperty(['fiat']);
	});

	it('Should throw error when one field is empty', async () => {
        currencyMock.code = ''

        await expect(currencyValidator.validate(currencyValidator)).rejects.toThrow(ValidationError);
    })

	it('should throw error when miss any property', async () => {
		delete currencyMock.name

		await expect(currencyValidator.validate(currencyMock)).rejects.toThrow(ValidationError);
	});
});
