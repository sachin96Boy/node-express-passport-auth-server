import express from 'express';

export const userRouter = express.Router();

// login Section
userRouter.get('/login', (req, res)=> res.send('login'));


// login Section
userRouter.get('/register', (req, res)=> res.send('register'));

 