const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {

    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        return res.redirect('back');
    }
    catch (err) {
        console.log('Error in creating the post');
        return;
    }
}

module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);

        // Authorization
        // .id means converting the object id into string so that it can be compared easily
        if (post.user == req.user.id) {
            post.remove();

            Comment.deleteMany({ post: req.params.id });

            return res.redirect('back');

        } else {
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log('Error in deleting post', err);
        return;
    }
}