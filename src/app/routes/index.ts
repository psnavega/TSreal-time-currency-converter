import {Router} from 'express';
import {getCurrencies, getCurrency, postCurrency, deleteCurrency, patchCurrency} from '../controllers/CurrencyController';

const routes = Router();

routes.get('/currency/:code', getCurrency);
routes.get('/currency', getCurrencies);
routes.post('/currency/', postCurrency);
routes.delete('/currency/:code', deleteCurrency);
routes.patch('/currency/:code', patchCurrency);

export default routes;
