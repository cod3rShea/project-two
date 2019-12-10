// Requiring our models and passport as we've configured it
var db = require("../models");

module.exports = function(app) {
    
    app.post("/api/favorites", function(req, res) {
      console.log(req.body.id);
      db.Favorites.update(
        {
          myFavorite: req.body.myFavorite
        },
        {
          where: {
            id: req.body.id
          }
        }).then(function(dbFavorites) {
        res.json(dbFavorites);
      });
    });

};

