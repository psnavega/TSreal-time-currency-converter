import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI;

export default async function connectToMongoDb(): Promise<void> {
	try {
		await mongoose.connect(mongoURI);

		console.log('Mongo - Connected successfully');
	} catch (e: unknown) {
		console.log('Mongo - No connected');
		throw e;
	}
}
