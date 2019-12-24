const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {
    try {
        // find the post first before creating the comment, which is to be added to the Post itself.
        let post = await Post.findById(req.body.post);
        if (post) {
            //  if post is found then create the comment.
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            
            // Adding comment to Post. || UPDATE ||
            post.comments.push(comment);
            post.save(); // Whenever you update anything, call save after it.


            if(req.xhr) {
                comment = await comment.populate('user', 'name').execPopulate();

                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment Created!"
                });
            }

            return res.redirect('back');
        }
    }
    catch (err) {
        console.log('Error:', err);
        return;
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);

        // Authorisation
        if (comment.user == req.user.id) {
            // If we directly remove the comment then the reference to the post will be lost i.e post_id coz Post has comment array
            let postId = comment.post;

            comment.remove();

            // Removing the comment from comments array in the Post Model
            let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

            if(req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment Deleted!"
                });
            }

            return res.redirect('back');

        } else {
            return res.redirect('back');
        }
    }
    catch(err) {
        console.log('Error:', err);
        return;
    }
}

// TODO:: Delete the comments of other user's in your post