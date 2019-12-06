var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];

str = window.location.href;
var res = str.split("=").pop();

var recipeId = res;

var apiKey = "4cc7196cb8a248819a49fe3043bfb694";

var queryURL = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=" + apiKey;
// AJAX to pull in API URL and "get" method
$.ajax({
    url: queryURL,
    method: "GET"
})
    // create function to pull recipe search results
    .then(function (result) {

        jQuery('.recipe-img').attr('src', result.image).attr('data', recipeId);
        jQuery('.recipe-name').html(result.title).append('<i class="fas fa-sort-down"></i>');

        for (i = 0; i < result.extendedIngredients.length; i++) {

            jQuery('.ingredients-sidebar ul').append("<li>" + result.extendedIngredients[i].original + "</li>");

        }

        jQuery('h1.recipe-name').on('click', function () {
            jQuery(this).toggleClass('closed')
            jQuery('.ingredients-sidebar').toggle();

        });

        for (j = 0; j < result.analyzedInstructions[0].steps.length; j++) {
            jQuery('#slider').append("<div class='item'> <p>" + result.analyzedInstructions[0].steps[j].step + "</p></div>");
        }

        jQuery(document).ready(function () {
            jQuery('.owl-carousel').owlCarousel({
                loop: true,
                margin: 0,
                items: 1,
                dots: true,
                nav: true,
                autoplay: false,
                autoplayTimeout: 7000,
                autoplayHoverPause: true,
                autoHeight: true
            });

            var favoriteID = jQuery('recipe-img').attr('data');

            $.get("/api/user_data").then(function(data) {
                var userId = data.id;


                jQuery(".recipe-img").on("click", function (event) {
                    event.preventDefault();
                    alert(recipeId);
                    alert(userId);
                    addFavorite();


                    // function addFavorite(users) {
                    //     $.ajax({
                    //         method: "PUT",
                    //         url: "/api/favorites",
                    //         data: users
                    //     }).then(function() {

                    //         window.location.href = "/recipe?id=" + recipeId;
                    //     })
                    // }

                    // $.put("/api/favorites", function() {
                    //     db.users.update({
                    //         myFavorite: recipeId
                    //     },
                    //     {
                    //         where: {
                    //         id: recipeId
                    //         }
                    //     }).then(console.log("updated"));

                    // });
                    // addFavorite();
                    // on click of heart icon, add recipe id to favorites in database
                   
                    function addFavorite() {
                    console.log("Inserting a new favorite...\n");
                    config.query(
                        "UPDATE auce_dev.users SET ? WHERE ?",
                        [
                        {
                            myFavorite: recipeId
                        },
                        {
                            id: recipeId
                        }
                        ],
                        function(err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " user added a new favorite!\n");
                        }
                    );
                    // change icon style
                    $("#heart-icon").addClass("fas").removeClass("far");
                    };
            });
        });

    });

  // logs the actual query being run
});