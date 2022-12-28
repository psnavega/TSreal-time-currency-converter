import {
    saveCurrency
} from '../dao/CurrencyDao';
import CurrencyModel from '../models/currency';
import axios from 'axios';
import { CurrencyType, EconomyType } from '../types/types';


export async function firstCharge(): Promise<void> {
    await CurrencyModel.remove();

    const initialCurrencies = ['BRL','EUR','USD'];
    
    initialCurrencies.forEach(async code => {
        if(code === 'USD') {
            const body: CurrencyType = {
                name: 'Dólar Americano',
                code: 'USD',
                rate: 1,
                fiat: true,
            };

            return saveCurrency({body});
        }

        const data = await axios.get(`https://economia.awesomeapi.com.br/json/last/USD-${code}`);

        const body: CurrencyType = mountType(data.data[`USD${code}`]);

        return saveCurrency({body});
    });

    console.log('Initial charge - datas inserted');
}


function mountType(data: EconomyType): CurrencyType {
	const nameFormated = data.name.split('/')[1];

	const body: CurrencyType = {
		name: nameFormated,
		code: data.codein,
		rate: Number(data.bid),
		fiat: true,
	};

	return body;
}
