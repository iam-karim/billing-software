import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { logger } from './utils/logger';

const app = express();
app.use(helmet());
// app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(cors({
  origin: '*', // or '*' temporarily
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('combined'));

app.get('/', (_req, res) => res.json({ ok: true, message: 'InvoicePro API' }));
app.use(routes);
app.use(errorHandler);
export default app;
