import connectToMongoDb from '../database';
import appMiddlewares from './middleware';
import type {Express} from 'express';

export default function appFactory(app: Express): void {
	connectToMongoDb();
	appMiddlewares(app);
}
