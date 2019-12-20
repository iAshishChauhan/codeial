const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {

    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        // Detect an ajax request and return a response of json object with a status
        // xhr is xmlhttprequest i.e ajax request

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post Created!"
            });
        }

        return res.redirect('back');
    }
    catch (err) {
        console.log('Error in creating the post');
        return res.redirect('back');
    }
}

module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);

        // Authorization
        // .id means converting the object id into string so that it can be compared easily
        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post Deleted"
                });
            }

            return res.redirect('back');

        } else {
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log('Error in deleting post', err);
        return res.redirect('back');
    }
}