import express from 'express';
import config from './config/index.js';
import routes from './routes/index.js';
import signupRouter from './routes/signup.js';

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);
app.use('/signup', signupRouter);

// Error handling middleware
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something broke!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send({ error: 'Not Found' });
});

const server = app.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});

// Handle process termination
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default app;
