$(document).ready(function() {
    $("#search-btn").on("click", function(e) {
      e.preventDefault();

      // clear out any previous search results
      $("#results").append("");

      // create variables for spoonacular API query string
      var search = $("#recipe-search").val().trim();
      var apiKey = "66d6e337667747b98c1c739d66a19316";

      var queryURL = "https://api.spoonacular.com/recipes/search?query=" + search + "&instructionsRequired=true&number=12&apiKey=" + apiKey;

      // AJAX to pull in API URL and "get" method
      $.ajax({
      url: queryURL,
      method: "GET"
      })

      // create function to pull recipe search results
      .then(function(result) {

        console.log(queryURL);

        if (result.results.length === 0) {
          var noResults = $("<div>").addClass("no-results");
          noResults.text("No results found. Please try a new search");

          $("#results").append(noResults);
          console.log(result.results.length);
        } else {

          for ( var i = 0; i < result.results.length; i++){

            var recipeTitle = result.results[i].title;
            var recipeImgSrc = "https://spoonacular.com/recipeImages/" + result.results[i].image;
            var recipeId = result.results[i].id;

            console.log(recipeTitle);
            console.log(recipeImgSrc);
            console.log(recipeId);

            var card = $("<a href='/recipe?id=" + recipeId + "'/>").addClass("col-md-3 recipe-result card");
            card.attr("data-arrayIndex",i);

            var cardImg = $("<img>").addClass("search-image card-img-top");
            cardImg.attr("src", recipeImgSrc);
            
            cardImg.attr("alt",recipeTitle);
            cardImg.attr("id",recipeId);
            card.append(cardImg);

            // card Body div
            var cardBody = $("<div>").addClass("card-body");
            var cardBodyTitle = $("<h5>").addClass("card-title");

            cardBodyTitle.text(recipeTitle);
            cardBody.append(cardBodyTitle);

            // append to card
            card.append(cardBody);
            
            // append to html
            $("#results").append(card);
          };
        }
      });
    });
  });