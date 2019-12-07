// Requiring necessary npm packages
var str = window.location.href;
var res = str.split("=").pop();

var myFavorite = res;

var apiKey = "4cc7196cb8a248819a49fe3043bfb694";

var queryURL = "https://api.spoonacular.com/recipes/" + myFavorite + "/information?apiKey=" + apiKey;
// AJAX to pull in API URL and "get" method
$.ajax({
    url: queryURL,
    method: "GET"
})
    // create function to pull recipe search results
.then(function (result) {

        $('.recipe-img').attr('src', result.image).attr('data', myFavorite);
        $('.recipe-name').html(result.title).append('<i class="fas fa-sort-down"></i>');

        for (i = 0; i < result.extendedIngredients.length; i++) {

            $('.ingredients-sidebar ul').append("<li>" + result.extendedIngredients[i].original + "</li>");

        }

        $('h1.recipe-name').on('click', function () {
            $(this).toggleClass('closed')
            $('.ingredients-sidebar').toggle();

        });

        for (j = 0; j < result.analyzedInstructions[0].steps.length; j++) {
            $('#slider').append("<div class='item'> <p>" + result.analyzedInstructions[0].steps[j].step + "</p></div>");
        }

        $(document).ready(function () {
            $('.owl-carousel').owlCarousel({
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

            var favoriteID = $('recipe-img').attr('data');

            $.get("/api/user_data").then(function (data) {
                var id = data.id;


                $(".recipe-img").on("click", function (event) {
                    event.preventDefault();
                    var favoriteData = {
                        myFavorite: myFavorite,
                        id: id,
                    };
                    if (!favoriteData.myFavorite || !favoriteData.id) {
                        return;
                    }
                    recipeInformation(favoriteData.myFavorite, favoriteData.id);
                });
            
                function recipeInformation(myFavorite, id) {
                    $.post("/api/favorites", {
                        myFavorite: myFavorite,
                        id: id,
                    })
                    .then(function (data) {
                        $("#heart-icon").addClass("fas").removeClass("far");
                    })
                    .catch(handleLoginErr);
                }

                function handleLoginErr(err) {
                    console.log(err.responseJSON);
                }
            });
        });
    });