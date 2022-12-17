import { ValidationError } from 'yup';
import {conversionValidator} from '../../src/app/validators/conversion'

describe('Test conversion validator', () => {
    const conversionMocker = {
        from: 'PKC',
        to: 'USD',
        amount: 100
    }

    it('Should has all properties', async () => {
        const response = await conversionValidator.validate(conversionMocker)

		expect(response).toHaveProperty(['from']);
		expect(response).toHaveProperty(['to']);
		expect(response).toHaveProperty(['amount']);
    })

    it('Should throw error when one field is empty', async () => {
        conversionMocker.from = ''

        await expect(conversionValidator.validate(conversionMocker)).rejects.toThrow(ValidationError);
    })

    it('Should throw error when at least one property doesn`t exists', async () => {
        delete conversionMocker.from

        await expect(conversionValidator.validate(conversionMocker)).rejects.toThrow(ValidationError);
    })
})
