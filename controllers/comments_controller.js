const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res) {
    // find the post first before creating the comment, which is to be added to the Post itself.
    Post.findById(req.body.post, function(err, post){
         if(post) {
            //  if post is found then create the comment.
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                if(err) { console.log('Error in creating comment in DB'); return; }

                // Adding comment to Post. || UPDATE ||
                post.comments.push(comment);
                post.save(); // Whenever you update anything, call save after it.

                return res.redirect('back');
            });
         }
    });
}