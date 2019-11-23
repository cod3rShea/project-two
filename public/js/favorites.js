
var queryURL = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=3c9001a65f5b40ab89bf8aa19d50ba03" + apiKey;
// AJAX to pull in API URL and "get" method
    $.ajax({
    url: queryURL,
    method: "GET"
})

$(document).ready(function() {

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



