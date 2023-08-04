import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

// usermodel
import userModel from '../models/User';
import { PassportStatic } from 'passport';

export const authcheck = (passport: PassportStatic) => {
    passport.use(new LocalStrategy(
        async (email: string, password: string, done: Function) => {
            await userModel.findOne({ email: email }).then((user) => {
                if (!user) {
                    return done(null, false);
                }
                // match passwords
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    }
                    return done(null, false);

                })
            }).catch(err => {
                return done(err);
            });
        }
    ));
    passport.serializeUser((user, done) => {
        console.log(`--------> Serialize User`)
        console.log(user)

        done(null, user.id)

        // Passport will pass the authenticated_user to serializeUser as "user" 
        // This is the USER object from the done() in auth function
        // Now attach using done (null, user.id) tie this user to the req.session.passport.user = {id: user.id}, 
        // so that it is tied to the session object

    });


    passport.deserializeUser((id, done) => {
        console.log("---------> Deserialize Id")
        userModel.findById(id, (err: Error, user: any) => {
            done(err, user);
        })

        // This is the id that is saved in req.session.passport.{ user: "id"} during the serialization
        // use the id to find the user in the DB and get the user object with user details
        // pass the USER object in the done() of the de-serializer
        // this USER object is attached to the "req.user", and can be used anywhere in the App.

    });
};

