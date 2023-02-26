import * as yup from 'yup';
import type {ConversionType, CurrencyType} from '../types/types';

const conversionValidator = yup.object().shape({
	to: yup
		.string()
		.required('Field TO is required')
        .uppercase(),
	from: yup
		.string()
		.required('Field FROM is required')
		.uppercase(),
	amount: yup
		.number()
		.required('Field amount is required'),
});

export {conversionValidator};

