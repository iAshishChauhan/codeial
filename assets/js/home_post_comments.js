
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

        // let self = this;
        // call for all existing comments (Deletion)
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

}