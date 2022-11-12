import express from 'express';
import appFactory from './configs';

const app = express();

appFactory(app);

export default app;
