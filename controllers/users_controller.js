const User = require('../models/user');

// Exporting the actions.
// Actions

module.exports.profile = function (req, res) {
    if(req.cookies.user_id) {
        User.findById(req.cookies.user_id, function(err,user){
            if(user){
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                });
            }
            else {
                return res.redirect('/users/sign-in');
            }
        });
    }
    else {
        return res.redirect('/users/sign-in');
    }
}

// render the signup page
module.exports.UserSignUp = function (req, res) {
    res.render('user_sign_up', {
        title: "Codial | Sign Up"
    });
}

// render the signin page
module.exports.UserSignIn = function (req, res) {
    res.render('user_sign_in', {
        title: "Codial | Sign In"
    });
}

// get the signup data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('Error in finding the user in signing up'); return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('Error in creating the user while signing up'); return }

                return res.redirect('/users/sign-in');
            });
        } else {
            return res.redirect('back');
        }
    });

}

// Sign In and create a Session
module.exports.createSession = function (req, res) {
    // MARK:: Steps to Authenticate.

    // find the user
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('Error in finding the user in signing In'); return }

        // handle if user is found
        if (user) {
            // handle password mismatch
            if(user.password != req.body.password) {
                return res.redirect('back');
            }
            // handle session creation

            // Creating cookie.
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');

        } else {
            // handle if user not found
            return res.redirect('back');
        }
    });
}

// Signing Out

module.exports.signOut = function(req, res) {
    if(req.cookies.user_id) {
        User.findById(req.cookies.user_id, function(err, user){
            if(user) {
                res.clearCookie('user_id', {path: '/'});
                return res.redirect('/users/sign-in');
            }else {
                return res.redirect('/users/sign-in');
            }
        });
    }
    else {
        return res.redirect('/users/sign-in');
    }
}
