
import type {SchemaOf} from 'yup';
import * as yup from 'yup';
import type {CurrencyType} from '../types/types';

const currencyValidator: SchemaOf<CurrencyType> = yup.object().shape({
	name: yup
		.string()
		.required('Field name is required'),
	code: yup
		.string()
		.required('Field code is required')
		.uppercase(),
	rate: yup
		.number()
		.required('Field rate is required'),
	fiat: yup
		.boolean()
		.required('Field if is fiat is required'),
});

export {currencyValidator};

