require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// A la instancia de Sequelize le falta la URL de conexión. ¡Agrégala!
// Recuerda pasarle la información de tu archivo '.env'.
const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/rickandmorty`,
	{ logging: false, native: false }
);

// Debajo de este comentario puedes ejecutar la función de los modelos.
// creacion de los modelos
const FavoriteModel = require("./models/Favorite.js");
const UserModel = require("./models/User.js");
FavoriteModel(sequelize);
UserModel(sequelize);

// ¡Relaciona tus modelos aquí abajo!
// utilizando los modelos ya existentes en sequelize
const { User, Favorite } = sequelize.models;
User.belongsToMany(Favorite, { through: "user_favorite" });
Favorite.belongsToMany(User, { through: "user_favorite" });

module.exports = {
	...sequelize.models,
	conn: sequelize
};
