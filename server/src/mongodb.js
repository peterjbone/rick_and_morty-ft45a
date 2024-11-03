require("dotenv").config();
const { connect, Schema, model, models } = require("mongoose");

if (!process.env.MONGODB_URL) {
	throw new Error("MONGODB_URL must be define.");
}

async function connectDB() {
	try {
		await connect(process.env.MONGODB_URL);
		console.log("Connection established with the database!", res);
	} catch (error) {
		console.log("Error connecting to database", error);
	}
}

const userModel = require("./newModels/User.js");
const favoriteModel = require("./newModels/Favorite.js");

userModel.add({
	favorites: [{ type: Schema.Types.ObjectId, ref: "Favorite" }]
});
favoriteModel.add({
	users: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

const User = models.User || model("User", userSchema);
const Favorite = models.Favorite || model("Favorite", favoriteSchema);

module.exports = {
	User,
	Favorite,
	connectDB
};
