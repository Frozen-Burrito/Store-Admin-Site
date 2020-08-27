const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../Models/User');

const passportStrategy = ( passport ) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, ( email, password, complete) => {

            User.findOne({ email: email })
                .then( user => {
                    if (!user) {
                        return complete( null, false, { message: 'No account found for this email' });
                    }

                    bcrypt.compare( password, user.password, ( error, isMatch ) =>{
                        
                        if (error) throw error;

                        if (isMatch) {
                            return complete( null, user);
                        } else {
                            return complete( null, false, { message: 'The password is incorrect' });
                        }
                    });
                })
                .catch( error => console.log(error))
        })
    );

    passport.serializeUser(( user, complete ) => {
        complete( null, user.id );
    });

    passport.deserializeUser(( id, complete) => {
        User.findById( id, ( error, user ) => {
            complete( error, user );
        })
    }) 
}

module.exports = passportStrategy;