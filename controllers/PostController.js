class PostController {

    costructor() { };

    closeModal() {
        $("#exampleModal").modal("hide");
    }

    resetModal() {
        $("#postTitle").val("");
        $("#postContent").val("");
        $("#publiCheck").prop("checked", false);
        $("#featuredCheck").val("checked", false);

    }

    addPost() {

        postC.closeModal();
        
        var title = $("#postTitle").val();
        var content = $("#postContent").val();
        var publicc = $('#publiCheck').is(":checked");
        var featured = $('#featuredCheck').is(":checked");
        
        postC.resetModal();
        
        var post = new Post(title, content, publicc, featured);
        posts.push(post);
        
        postC.generatePosts(post);
        
        return posts;
    }

    generatePosts(post) {

        if (post.publicc === true && post.featured === true) {
            var article = '<div class="row my-6"><div class="col-md-12 card" style="background-color:#ef9a9a"><div class="card"><header class="card-header">' + post.title + '</header><img src="..." class="card-img-top" alt="..."><article class="card-text"><h5 class="card-title">' + post.title + '</h5><p class="card-text">' + post.content + '</p></article><footer><p>Public</p></footer></div></div>'
            $(".articles").prepend(article);
        }
        else if (post.publicc === true && post.featured === false) {
            var article = '<div class="row my-6"><div class="col-md-12 card"><div class="card"><header class="card-header">' + post.title + '</header><img src="..." class="card-img-top" alt="..."><article class="card-text"><h5 class="card-title">' + post.title + '</h5><p class="card-text">' + post.content + '</p></article><footer><p>Public</p></footer></div></div>'
            $(".articles").append(article);
        }
        else if (post.publicc === false) {
            var article = '<div class="row my-6"><div class="col-md-12 card"><div class="card"><header class="card-header">' + post.title + '</header><img src="..." class="card-img-top" alt="..."><article class="card-text"><h5 class="card-title">' + post.title + '</h5><p class="card-text">' + post.content + '</p></article><footer><p>Draft</p></footer></div></div>'
            $(".articles").append(article);
        }
        else {
            var article = '<div class="my-6"><div class="row y-6"><div class="col-md-12 card"><div class="card"><header class="card-header">' + post.title + '</header><img src="..." class="card-img-top" alt="..."><article class="card-text"><h5 class="card-title">' + post.title + '</h5><p class="card-text">' + post.content + '</p></article><footer><p>Draft</p></footer></div></div></div>'
            $(".articles").append(article);
        }

    }

    showPosts(posts) {

        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            postC.generatePosts(post);


        }

    }

}

var posts = [];

posts.push(new Post("Je", "blablabla", true, false))
posts.push(new Post("Ne", "blablabla", true, false))
posts.push(new Post("Sais", "blablabla", true, false))
posts.push(new Post("Pas", "blablabla", true, false))

let postC = new PostController();

$(document).ready(function () {

    $("#saveBtn").click(function () {
        postC.addPost();
    });

    postC.showPosts(posts);

});

