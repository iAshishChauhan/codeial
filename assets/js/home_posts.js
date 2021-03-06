{
    // Method to submit the form data for new post using AJAX

    let createPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),  // This will convert form data into object
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);

                    // calling ajax deletepost function on the new post to populate
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    // Notification
                    new Noty({
                        theme: 'relax',
                        text: 'Post Published',
                        layout: 'topRight',
                        type: 'success',
                        timeout: 1500
                    }).show();

                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    // Method to create a post in DOM

    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
                    <p>
    
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                        </small>
                        
                        ${post.content}
                        <br>
                        <small>${post.user.name} </small>
                    </p>
                    <div class="post-comments">
                        
                        <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="Add Comment..." required>
                            <input type="hidden" name="post" value="${ post._id}">
                            <input type="submit" value="Add Comment">
                        </form>
                        
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id}">
                                
                            </ul>
                        </div>
                    </div>
                </li>`);
    }


    // Method to delete a post from DOM

    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();

                    // Notification
                    new Noty({
                        theme: 'relax',
                        text: 'Post Deleted',
                        layout: 'topRight',
                        type: 'success',
                        timeout: 1500
                    }).show();

                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    // Call the function deletePost for the each of the Posts when the page loads
    let convertPostsToAjax = function () {
        $('#posts-list-container>ul>li').each(function () {
            let self = $(this);
            let deleteButtonLink = $(' .delete-post-button', self);
            deletePost(deleteButtonLink);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }

    // Calling the functions
    createPost();
    convertPostsToAjax();

}