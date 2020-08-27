
const authView = ( req, res, next ) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/users/login');
}

const protectedView = ( authLevel ) => {
    return ( req, res, next ) => {
        if (req.isAuthenticated()){
            if (req.user.role === authLevel) {
                return next();
            }

            res.redirect('/dashboard');
        }

        res.redirect('/users/login');
    }
}

module.exports = {
    authView,
    protectedView,
}