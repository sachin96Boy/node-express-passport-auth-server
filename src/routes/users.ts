import express from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/User';
import passport from 'passport';


export const userRouter = express.Router();

// login Section
userRouter.get('/login', (req, res) => res.send('login'));


// Register Section
userRouter.get('/register', (req, res) => res.send('register'));

// Register users from Form
userRouter.post('/register', (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    // todo - let's add validation with 3rd party middleare package

    // validate
    UserModel.findOne({
        email: email
    }).then((user) => {
        if (user) {
            // user already available, add logic
        }
        // if not add as a new user with 
        // encrypt password
        const newUser = new UserModel(
            {
                name, email, password
            }
        );

        // hash password
        bcrypt.genSalt(Number(process.env.SALTROUNDS), (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                throw err;
            }
            // set password to hash
            newUser.password = hash;
            newUser.save().then(user => {
                res.send(user);
            }).catch(err => {
                console.log(err);
            })

        }));
    })

});

// login User
userRouter.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res, next) => {
    res.redirect('/');
});

// logout
userRouter.get('/logout', (req, res, next) => {
    req.logOut((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
})

