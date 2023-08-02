import express, { Express, Request, Response } from 'express';
import {indexRouter} from './routes/index';
import {userRouter} from './routes/users'
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Routes
app.use('/', indexRouter);
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});