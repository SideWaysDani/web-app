import express from 'express';
import config from './config/index.js';
import routes from './routes/index.js';

const app = express();

app.use('/', routes);

app.listen(config.port, () => {
  let a= 1;
  a++
  console.log(`Server is running at http://localhost:${config.port}`);
});
