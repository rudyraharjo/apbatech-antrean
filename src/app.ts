import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import ErrorHandlerMiddleware from './middlewares/ErrorHandlerMiddleware';
import routerWeb from './routes/web';

const app: express.Application = express();

app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json()); //default init { limit: '5mb' }
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', routerWeb);
app.use(ErrorHandlerMiddleware);

export default app;