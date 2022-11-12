import {Router} from 'express';
import {getCurrencies, getCurrency, postCurrency, deleteCurrency, patchCurrency} from '../controllers/CurrencyController';

const routes = Router();

routes.get('/currency/:id', getCurrency);
routes.get('/currency', getCurrencies);
routes.post('/currency/', postCurrency);
routes.delete('/currency/:id', deleteCurrency);
routes.patch('/currency/:id', patchCurrency);

export default routes;
