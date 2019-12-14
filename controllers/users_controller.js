const User = require('../models/user');

// Exporting the actions.
// Actions

module.exports.profile = function (req, res) {

    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile', {
            title: "Profile",
            profile_user: user
        });
    });

}

// Update User information
module.exports.update = function (req, res) {
    // Check to ensure logged in user cannot fiddle with other users.
    if (req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, { name: req.body.name, email: req.body.email }, function (err, user) {
            req.flash('success', 'User information updated');
            return res.redirect('back');
        });
    } else {
        return res.status(401).send('Unauthorised');
    }
}

// render the signup page
module.exports.UserSignUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codial | Sign Up"
    });
}

// render the signin page
module.exports.UserSignIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "Codial | Sign In"
    });
}

// get the signup data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirmPassword) {
        req.flash('error', 'Confirm Password does not match');
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('Error in finding the user in signing up'); return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('back');
                }
                req.flash('success', 'You are successfully Registered');
                return res.redirect('/users/sign-in');
            });
        } else {
            req.flash('error', 'User already Registered');
            return res.redirect('back');
        }
    });

}

// Sign In and create a Session   || Session is created using session cookie using passport js which used as middle ware while defining the routes.
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Successfully');
    // Since the above flash is a req object, but we need to send it as a response
    // So we have to create a middleware for it. However we can send it as context

    return res.redirect('/');
}

// Sign Out

module.exports.destroySession = function (req, res) {
    req.logout(); // This function is given to req using passport.js
  
    req.flash('success', 'You have Logged out');

    return res.redirect('/');
}

