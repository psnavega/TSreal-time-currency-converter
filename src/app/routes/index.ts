import {Router} from 'express';
import {getCurrencies, getCurrency, postCurrency, deleteCurrency} from '../controllers/CurrencyController';
import {conversionCurrency} from '../controllers/ConversionController';

const routes = Router();

routes.get('/currency/conversion', conversionCurrency);
routes.get('/currency/:code', getCurrency);
routes.get('/currency', getCurrencies);
routes.post('/currency/', postCurrency);
routes.delete('/currency/:code', deleteCurrency);

export default routes;
