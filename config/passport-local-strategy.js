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

module.exports = passport;