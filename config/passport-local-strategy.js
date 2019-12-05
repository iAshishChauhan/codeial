const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email,password,done) {
        // find the user and establish the identity.
        User.findOne({email: email},function(err, user){
            if(err) {
                console.log('Error in finding the user ---> Passport');
                return done(err);
            }

            if(!user || user.password != password) {
                console.log('Invalid username/password');
                return done(null,false);
            }

            return done(null, user);
        });
    }
));

// Serializing the user to decide which key is to be kept in cookies.  OR Cookie bana dena browser mei.
passport.serializeUser(function(user, done){
    done(null,user.id);
});

// De-Serializing the user from the key in cookies.  OR browser Cookie se user ko db Mei doondhna
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err) {
            console.log('Error in finding the user --> Passport');
            return done(err);
        }
        return done(null,user);
    });
});

// Check if the User is authenticated

passport.checkAuthentication = function(req,res,next) {
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()) {
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in'); 
}

// Sending the signed in user information to the views.

passport.setAuthenticatedUser = function(req,res,next) {
    if(req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views.
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;