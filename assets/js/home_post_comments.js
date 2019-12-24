
// CLASS
// This class is initialized for every post on the page.
// 1. When the page loads
// 2. Creation of every post dynamically via ajax

class PostComments {
    // Constructor
    constructor(postId) {
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all existing comments (Deletion)
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }

    createComment(postId) {
        let pself = this;

        this.newCommentForm.submit(function (e) {
            e.preventDefault();
            let self = this;
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function (data) {
                    let newComment = pself.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);

                    // Calling delete comment method when post is created
                    let deleteLink = $(' .delete-comment-button', newComment);
                    pself.deleteComment(deleteLink);

                    // Notification
                    new Noty({
                        text: "Comment Posted",
                        theme: 'relax',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    // Creating new Comment DOM
    newCommentDom(comment) {
        return $(`<li id="comment-${comment._id}">
                    <p>
                        <small>
                            <a class="delete-comment-button" href="/comments/destroy/${ comment._id }">X</a>
                        </small>
                        ${comment.content}
                        <br>
                        <small>
                        ${comment.user.name}
                        </small>
                    </p>
                </li>`);
    }

    deleteComment(deleteLink) {
        $(deleteLink).click(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    // Remove comment from DOM
                    $(`#comment-${data.data.comment_id}`).remove();

                    // Notification
                    new Noty({
                        text: "Comment Deleted",
                        theme: 'relax',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();

                },
                error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }

}