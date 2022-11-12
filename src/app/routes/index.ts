import {Router} from 'express';
import {getCoins} from '../controllers/CurrencyController';

const routes = Router();

routes.get('/', getCoins);

export default routes;
