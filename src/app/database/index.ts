import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI;

export default function connectToMongoDb(): void {
	if (mongoURI) {
		void mongoose.connect(mongoURI);

		console.log('Connected successfully');
	} else {
		console.log('Connected without successfully');
	}
}
