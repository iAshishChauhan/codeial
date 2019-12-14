const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    // Populate the user of each post. || Populate => Join
    // We will use Async await here to simplify the query operations
    // Here, the 1st query will execute and await for the 2nd query and then 
    // after execution of 2nd query, the response will be sent to the browser
    // And Error will be handled by try catch

    try {
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

        let users = await User.find({});

        return res.render('home', {
            title: "Codial | Home",
            posts: posts,
            all_users: users
        });
    }
    catch (err) {
        console.log('Error:', err);
        return;
    }
}




