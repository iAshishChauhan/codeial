const Post = require('../models/post');

module.exports.home = function (req, res) {
    Post.find({}, function (err, post) {
        if (err) {
            console.log('Error in getting Posts from DB');
            return;
        }
        return res.render('home', {
            title: "Home",
            user_post: post
        });
    });
}


