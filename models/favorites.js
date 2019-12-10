module.exports = function(sequelize, DataTypes) {
    var Favorites = sequelize.define("Favorites", {
        myFavorite: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
    });
    Favorites.associate = function(models) {
      Favorites.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return Favorites;
  };
  