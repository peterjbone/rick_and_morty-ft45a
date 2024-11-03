//** ESTE DOCUMENTO ES PARA CONECTAR LA BB Y PARA CREAR LOS MODELOS CON SUS RELACIONES
require("dotenv").config();
const { connect, Schema, model, models } = require("mongoose");

if (!process.env.MONGODB_URL) {
	throw new Error("MONGODB_URL must be define.");
}

async function connectDB() {
	try {
		await connect(process.env.MONGODB_URL);
		console.log("Connection established with the database!");
	} catch (error) {
		console.log("Error connecting to database", error);
	}
}

// importo modelos
const userModel = require("./newModels/User.js");
const favoriteModel = require("./newModels/Favorite.js");

// creo las relaciones o referencias
userModel.add({
	favorites: [{ type: Schema.Types.ObjectId, ref: "Favorite" }]
});
favoriteModel.add({
	users: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

// creando los modelos y trayendo el esquema de la colección ya integrado
const User = models.User || model("User", userSchema);
const Favorite = models.Favorite || model("Favorite", favoriteSchema);

module.exports = {
	User,
	Favorite,
	connectDB
};
