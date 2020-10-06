var comments = [];

comments.push(new Comment("Je", "blablabla"))
comments.push(new Comment("Ne", "blablabla"))
comments.push(new Comment("Sais", "blablabla"))
comments.push(new Comment("Pas", "blablabla"))


var commentsContainer;
var sendCommentBtn;


$(document).ready(function () {

    showComments(comments);

    $("#sendCommentBtn").click(addComment);
});

function resetComment() {
    $("#name").val("");
    $("#comment").val("");

}

function showComments(comments) {

    for (var i = 0; i < comments.length; i++) {
        var post = comments[i];
        showComment(post);
    }

}

function addComment() {

    var name = $("#name").val();
    var content = $("#comment").val();

    resetComment();

    var comment = new Comment(content, name);
    comments.push(comment);
    showComment(comment);

    return comment
};

function showComment(comment){

    var commentsList = $(".commentsList");
    var commentText = '<li class="list-group-item">' + comment.name + ": " + comment.content + '</li>';
    commentsList.append(commentText);

}

