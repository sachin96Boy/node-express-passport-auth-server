import express, { Express, Request, Response } from 'express';
import { indexRouter } from './routes/index';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import flash from 'connect-flash';
import { userRouter } from './routes/users'
import session from 'express-session';
import passport from 'passport';
import { authcheck } from './middleware/authMiddleware';

dotenv.config();

const app: Express = express();

// configure Passport
authcheck(passport);

// db config
const Connection_String = process.env.MONGODBURI!;
mongoose.connect(Connection_String).then(() => {
    console.log('MongoDB Connected...');
}).catch(err => {
    console.log(err);
});


const port = process.env.PORT;

// apply flash and session
app.use(session({
    secret: 'keyboard cat',
}));



// init passport on every route call.
app.use(passport.initialize())

// allow passport to use "express-session".
app.use(passport.session())

// connect flash 
app.use(flash());

// bodyparser
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', indexRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});