import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import loginRouter from './resources/login/login.router';
import { logger } from './common/logger';
import { logInfo, errorHandler } from './middlewares/error-handler';
import { isAuthenticated } from './middlewares/auth';
import 'reflect-metadata';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

process.on('uncaughtException', (error: Error) => {
  console.error('error', `captured error: ${error.message}`);
  logger.log('error', `captured error: ${error.message}`);
  const { exit } = process;
  exit(1);
});

// // PUT IT HERE
// throw Error('Oops!');

process.on('unhandledRejection', (reason: Error) => {
  console.error('error', `Unhandled rejection detected: ${reason.message}`);
  logger.log('error', `Unhandled rejection detected: ${reason.message}`);
  const { exit } = process;
  exit(1);
});

// // PUT IT HERE
// Promise.reject(Error('Oops!'));

app.use(logInfo);
app.use(errorHandler);

app.use('/login', loginRouter);

app.use(isAuthenticated);
app.use('/users', userRouter);
app.use('/boards', [boardRouter, taskRouter]);

export default app;
