const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../Models/User');

const loginHandle = ( req, res, next ) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',

    }) ( req, res, next );
}

const registerHandle = async( req, res ) => {
    const { name, email, password, passwordConfirm } = req.body;
    let formErrors = [];

    if (!name || !email || !password || !passwordConfirm) {
        formErrors.push({ message: 'All fields are required' });
    }

    if (password.length < 8) {
        formErrors.push({ message: 'Password must be at least 8 characters long' });
    }

    if (password !== passwordConfirm) {
        formErrors.push({ message: 'Passwords don\'t match' });
    }

    if (formErrors.length > 0) {

        context = {
            formErrors,
            name,
            email,
            password,
            passwordConfirm,
        };

        return res.status(300).json({
            success: false,
            errors: formErrors,
        })

    } else {

        const user = await User.findOne({ email: email });

        if (user) {
            formErrors.push({ message: 'A user with that email already exists' });

            context = {
                formErrors,
                name,
                email,
                password,
                passwordConfirm,
            };
    
            res.render('Auth/signup', context);
        } else {
            const newUser = new User({
                name, 
                email,
                password,
            });

            bcrypt.genSalt(10, ( error, salt ) => {
                bcrypt.hash( newUser.password, salt, async( error, hash ) => {
                    if (error) throw error;
                    
                    newUser.password = hash;

                    try {
                        await newUser.save();
                        res.redirect('/contacts');
                    } catch (error) {
                        console.log(error);
                    }
                    
                })
            })
        }
    }
}

const getUserList = async ( req, res ) => {

    try {
        const userList = await User.find({});

        return res.status(200).json({
            success: true,
            count: userList.length,
            data: userList,
        });

    } catch (error) {
        
        return res.status(500).json({
            success: false,
            error: 'Couldn\'t retrieve users',
        });
    }
}

const userDetails = async ( req, res ) => {
    
    try {
        const user = await User.findById( req.params.id );

        return res.status(200).json({
            success: true,
            data: user,
        });

    } catch (error) {
        
        return res.status(500).json({
            success: false,
            error: 'Couldn\'t retrieve user info',
        });
    }

}

const logoutHandle = ( req, res ) => {
    req.logout();
    res.redirect('/users/login');
}

module.exports = {
    loginHandle,
    registerHandle,
    getUserList,
    userDetails,
    logoutHandle,
}