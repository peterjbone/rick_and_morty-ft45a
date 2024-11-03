const { Schema, model, models } = require("mongoose");

const favoriteSchema = new Schema(
	{
		id: {
			type: Number,
			unique: true,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		status: {
			type: String,
			enum: ["Alive", "Dead", "unknown"],
			required: true
		},
		species: {
			type: String,
			required: true
		},
		gender: {
			type: String,
			enum: ["Female", "Male", "Genderless", "unknown"],
			required: true
		},
		origin: {
			type: String,
			required: true
		},
		image: {
			type: String,
			required: true
		},
		location: {
			type: String,
			required: true,
			default: "unknown"
		}
	},
	{ timestamps: false }
);

//const Favorite = models.Favorite || model("Favorite", favoriteSchema);
module.exports = favoriteSchema;
