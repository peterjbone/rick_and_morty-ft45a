const { Schema } = require("mongoose");

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			validate: {
				validator: (email) => /\S+@\S+\.\S+/.test(email),
				message: "El correo electrónico no es válido"
			}
		},
		password: {
			type: String,
			required: true
		}
	},
	{ timestamps: false }
);

//const User = models.User || model("User", userSchema);
module.exports = userSchema;
