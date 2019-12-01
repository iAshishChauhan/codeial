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
    // TODO Later
}

// Sign In and create a Session
module.exports.createSession = function(req, res) {
    // TODO Later
}
