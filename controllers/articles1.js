var posts = [];

posts.push(new Post("Je", "blablabla", true, false))
posts.push(new Post("Ne", "blablabla", true, false))
posts.push(new Post("Sais", "blablabla", true, false))
posts.push(new Post("Pas", "blablabla", true, false))


var postContainer;
var modal;
var saveBtn;
var articles = [];
var tags =[];
var article;



$(document).ready(function () {

    $("#saveBtn").click(addPost);



    $.get({
        url: "https://api.npoint.io/24620ef625c768a4f3c4",
        success: function (result, textStatus, jqXHR) {
            articles = result;

            function GetSortOrder(prop) {    
                return function(a, b) {    
                    if (a[prop] < b[prop]) {    
                        return 1;    
                    } else if (a[prop] > b[prop]) {    
                        return -1;    
                    }    
                    return 0;    
                }    
            }    
                
            articles.sort(GetSortOrder("featured"));  
            console.log("articoli",articles);

            for (var i = 0; i < articles.length; i++) {
                var post = articles[i];
                if(post.public===true)
                generatePosts(post);
                console.log(post.public);

            }
        }
    });



});


function closeModal() {
    $("#exampleModal").modal("hide");
}

function resetModal() {
    $("#postTitle").val("");
    $("#postContent").val("");
    $("#publiCheck").prop("checked", false);
    $("#featuredCheck").val("checked", false);

}

function addPost() {

    closeModal();

    var title = $("#postTitle").val();
    var body = $("#postContent").val();
    var public = $('#publiCheck').is(":checked");
    var featured = $('#featuredCheck').is(":checked");

    resetModal();

    var post = new Post(title, body, public, featured);
    if(post-featured===true){
        posts.unshift(post)
    }
    else{
        posts.push(post)
    };

    generatePosts(post);

    return posts;
}

function generatePosts(post) {

    var postContainer = $("#postContainer").clone();
    postContainer.css("display", "block");
    postContainer.attr("id", "");
    postContainer.addClass("class", "postContainer");

    var postHeader = postContainer.find(".card-header");
    var postBody = postContainer.find(".card-text");

    postHeader.html(post.title);
    postBody.html(post.body);
    tags=(post.tag).toString();

    $("#postsRow").append(postContainer, "Tag: "+tags); 

}

function publicPosts(post) {

}

function showPosts(articles) {

    for (var i = 0; i < articles.length; i++) {
        var post = posts[i];
        if (post.public === true) {
            generatePosts(post);
        }

    }

}