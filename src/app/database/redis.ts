import {createClient} from 'redis';

const redisURI = process.env.REDIS_URI;

const client = createClient({url: redisURI});

export default async function connectToRedis(): Promise<void> {
	try {
		await client.connect();

		console.log('Redis - Connected successfully');
	} catch (e: unknown) {
		console.log('Redis - No connected');
		console.log(`ERROR - ${e}`);
	}
}

export {client};
