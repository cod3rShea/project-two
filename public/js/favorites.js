
$(document).ready(function() {
    var
    var favorites;
// This function grabs posts from the database and updates the view
    function getFavorites(favoritesList) {
        var categoryString = category || "";
        if (categoryString) {
          categoryString = "/category/" + categoryString;
        }
        $.get("/api/favorites" + categoryString, function(data) {
          console.log("Posts", data);
          posts = data;
          if (!posts || !posts.length) {
            displayEmpty();
          }
          else {
            initializeRows();
          }
        });
    
      }
    
var queryURL = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=3c9001a65f5b40ab89bf8aa19d50ba03" + apiKey;
// AJAX to pull in API URL and "get" method
    $.ajax({
    url: queryURL,
    method: "GET"
    })
 // create function to pull recipe search results
 .then(function(result) {

    console.log(queryURL);

    if (result.results.length === 0) {
      var noFavorites = $("<div>").addClass("no-favorites");
      noFavorites.text("Please add to All You Can Eat Wall of Favs!");

      $("#favorites-list").append(noFavorites);
      console.log(result.results.length);
    } else {

        var FavoriteTitle = result.title;
        var FavoriteImgSrc = result.image;
        var FavoriteId = result.id;

        console.log(FavoriteTitle);
        console.log(FavoriteImgSrc);
        console.log(FavoriteId);

        var card = $("<div>").addClass("col-md-3 recipe-result card");
        card.attr("data-arrayIndex",i);

        var cardImg = $("<img>").addClass("search-image card-img-top");
        cardImg.attr("src", FavoriteImgSrc);
        
        cardImg.attr("alt",FavoriteTitle);
        cardImg.attr("id",FavoriteId);
        card.append(cardImg);

        // card Body div
        var cardBody = $("<div>").addClass("card-body");
        var cardBodyTitle = $("<h5>").addClass("card-title");

        cardBodyTitle.text(FavoriteTitle);
        cardBody.append(cardBodyTitle);

        // append to card
        card.append(cardBody);
        
// append to html
        $("#favorites-list").append(card);
      };
    });





// empties out the html
function renderFavorites(list) {
    $("#favorites-list").empty();
// reder favorites-list to the page
    for (var i = 0; i < list.length; i++) {
        var savedFavorites = $("<p>");
        savedFavorites.append(list[i]);
// favorite image 
$("#image-div").html("<img src='https://cdn3.iconfinder.com/data/icons/complete-set-icons/512/favourite512x512.png?resize=590%2C368&ssl=1' />"); 


    }
}

})

displayFavorites ();

function displayFavorites () {
    connection.query("SELECT * FROM products  WHERE id= ?", [{id}])
}


