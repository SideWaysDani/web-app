import express from 'express';
import config from './config/index.js';
import routes from './routes/index.js';
import signupRouter from './routes/signup.js';
import { requestLogger } from './utils/logger.js';
import logger from './utils/logger.js';

const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use(requestLogger);

// Routes
app.use('/', routes);
app.use('/api/signup', signupRouter);

// Error handling middleware
app.use((err, req, res, _next) => {
  logger.error(`Server Error: ${err.stack}`);
  res.status(500).send({ error: 'Something broke!' });
});

// 404 handler
app.use((req, res) => {
  logger.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).send({ error: 'Not Found' });
});

const server = app.listen(config.port, () => {
  logger.info(`Server is running at http://localhost:${config.port}`);
});

// Handle process termination
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Process terminated');
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Process terminated');
  });
});

export default app;
