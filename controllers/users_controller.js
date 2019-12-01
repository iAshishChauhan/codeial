const User = require('../models/user');

// Exporting the actions.
// Actions

module.exports.profile = function(req,res) {
    return res.render('user_profile', {
        title: "Profile"
    });
}

// render the signup page
module.exports.UserSignUp = function(req, res) {
    res.render('user_sign_up', {
        title: "Codial | Sign Up"
    });
}

// render the signin page
module.exports.UserSignIn = function(req, res) {
    res.render('user_sign_in', {
        title: "Codial | Sign In"
    });
}

// get the signup data
module.exports.create = function(req, res) {
    if(req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err) { console.log('Error in finding the user in signing up'); return}

        if(!user) {
            User.create(req.body, function(err, user){
                if(err){console.log('Error in creating the user while signing up'); return}

                return res.redirect('/users/sign-in');
            });
        } else {
            return res.redirect('back');
        }
    });

}

// Sign In and create a Session
module.exports.createSession = function(req, res) {
    
}
