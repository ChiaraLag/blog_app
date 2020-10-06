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

    if (post.public === true && post.featured === true) {
        article = '<div class="row my-6"><div class="col-md-12 card" style="background-color:#ef9a9a"><div class="card"><header class="card-header">' + post.title + '</header><img src="..." class="card-img-top" alt="..."><article><h5 class="card-title">' + post.title + '</h5><p class="card-text">' + post.body + '</p></article><footer><p>Public</p></footer></div></div>'
        tags=(post.tag).toString();
        $(".articles").prepend(article,"Tag: "+tags);
    }
    else if (post.public === true && post.featured === false) {
        article = '<div class="row my-6"><div class="col-md-12 card"><div class="card"><header class="card-header">' + post.title + '</header><img src="..." class="card-img-top" alt="..."><article><h5 class="card-title">' + post.title + '</h5><p class="card-text">' + post.body + '</p></article><footer><p>Public</p></footer></div></div>'
        tags=(post.tag).toString();
        $(".articles").append(article,"Tag: "+tags);
    }
    else if (post.public === false && post.featured === true) {
        article = '<div class="row my-6"><div class="col-md-12 card" style="background-color:#ef9a9a"><div class="card"><header class="card-header">' + post.title + '</header><img src="..." class="card-img-top" alt="..."><article><h5 class="card-title">' + post.title + '</h5><p class="card-text">' + post.body + '</p></article><footer><p>Draft</p></footer></div></div>'
        tags=(post.tag).toString();
        $(".articles").prepend(article,"Tag: "+tags);
    }
    else if (post.public === false && post.featured === false){
        article = '<div class="my-6"><div class="row y-6"><div class="col-md-12 card"><div class="card"><header class="card-header">' + post.title + '</header><img src="..." class="card-img-top" alt="..."><article><h5 class="card-title">' + post.title + '</h5><p class="card-text">' + post.body + '</p></article><footer><p>Draft</p></footer></div></div></div>'
        tags=(post.tag).toString();
        $(".articles").prepend(article,"Tag: "+tags);
    }

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