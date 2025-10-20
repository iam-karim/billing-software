import dotenv from 'dotenv';
import mongoose from 'mongoose';

import app from './app';
import { logger } from './utils/logger';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGO_URI).then(() => {
  logger.info('MongoDB connected');
  app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
  });
}).catch(err => {
  logger.error('MongoDB connection error', err);
  process.exit(1);
});
