var searchBar = document.getElementById("search-bar");
var currentFilter = "all";

function filterSelection(filter) {
    // Hide all elements that doesn't match the filter 
    // remove active from all buttons
    // add active to the button that was clicked
    // show all elements that match the filter, the class name is blog-post-item
    if (searchBar.value !== "") {
        searchBar.value = "";
    }

    if (filter === "all") {
        var buttons = document.getElementsByClassName("blog-filter-item");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("active");
        }

        document.getElementById("all-btn").classList.add("active");
        var posts = document.getElementsByClassName("blog-post-item");
        for (var i = 0; i < posts.length; i++) {
            posts[i].style.display = "block";
        }

        currentFilter = "all";
    } else {
        var posts = document.getElementsByClassName("blog-post-item");
        for (var i = 0; i < posts.length; i++) {
            if (posts[i].classList.contains(filter)) {
                posts[i].style.display = "block";
            } else {
                posts[i].style.display = "none";
            }
        }

        var buttons = document.getElementsByClassName("blog-filter-item");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("active");
        }

        document.getElementById(filter + "-btn").classList.add("active");

        currentFilter = filter;
    }
}

searchBar.addEventListener("keyup", function() {
    var filter = searchBar.value.toLowerCase();
    var posts = document.getElementsByClassName("blog-post-item");
    for (var i = 0; i < posts.length; i++) {
        var title = posts[i].getElementsByClassName("blog-post-title")[0].innerText;
        if (title.toLowerCase().indexOf(filter) > -1 && (currentFilter === "all" || posts[i].classList.contains(currentFilter))) {
            posts[i].style.display = "block";
        } else {
            posts[i].style.display = "none";
        }
    }
});

// Check if there is any ?filter= in the url
var url = new URL(window.location.href);
var filter = url.searchParams.get("filter");
if (filter !== null) {
    filterSelection(filter);
}
