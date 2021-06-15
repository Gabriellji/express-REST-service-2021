import 'reflect-metadata';
import { createConnection } from 'typeorm';
import app from './app';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path: path.join(__dirname, '../.env'),
});

const PORT = process.env.PORT || 4000;

createConnection()
  .then((_connection) => {
    app.listen(PORT, () => {
      console.log('Server is running on port', PORT);
    });
  })
  .catch((err) => {
    console.log('Unable to connect to db', err);
    process.exit(1);
  });
