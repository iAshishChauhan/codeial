const Post = require('../models/post');

module.exports.home = function (req, res) {
    // Populate the user of each post. || Populate => Join

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function (err, posts) {
        if (err) {
            console.log('Error in getting Posts from DB');
            return;
        }
        return res.render('home', {
            title: "Codial | Home",
            posts: posts
        });
    });
}




