import connectToMongoDb from '../database/mongo';
import connectToRedis from '../database/redis';
import appMiddlewares from './middleware';
import type {Express} from 'express';

export default async function appFactory(app: Express): Promise<void> {
	appMiddlewares(app);
	await connectToMongoDb();
	await connectToRedis();
}
