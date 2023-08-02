import express, { Express, Request, Response } from 'express';
import { indexRouter } from './routes/index';
import { userRouter } from './routes/users'
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();

// db config
const Connection_String = process.env.MONGODBURI!;
mongoose.connect(Connection_String).then(() => {
    console.log('MongoDB Connected...');
}).catch(err => {
    console.log(err);
});


const port = process.env.PORT;

// bodyparser
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', indexRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});