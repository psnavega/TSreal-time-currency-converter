import 'dotenv/config';
import app from './app';
import { firstCharge } from './app/util/firstCharge';

const {PORT} = process.env;

app.listen(PORT, () => {
	console.log(`listening port ${PORT}`);
});

firstCharge();