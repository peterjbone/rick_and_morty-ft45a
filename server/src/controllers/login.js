//? Esta ruta solo sirve para el login del Usuario de prueba

//const { User } = require("../DB_connection.js");
const { User } = require("../mongodb.js");

async function login(req, res) {
	const { email, password } = req.query;

	try {
		/* if (email && password) {
			const currentUser = await User.findOne({
				where: { email }
			});

			if (currentUser) {
				if (currentUser.password === password) {
					return res.status(200).json({ access: true });
				}
				return res.json({ access: false, detail: "password" });
			}
			return res.json({ access: false, detail: "email" });
		} */

		// revisa si llego correo y contraseña
		if (email && password) {
			// si encuentra el email
			const user = await User.findOne({ email: email });
			if (user) {
				// si la contraseña coincide
				if (user.password === password) {
					return res.status(200).json({ access: true });
				}
				return res.json({ access: false, detail: "password" });
			}
			return res.json({ access: false, detail: "email" });
		}
		return res.status(400).send("Faltan datos");
	} catch (error) {
		// Algún error de mongoose o mongodb
		res.status(500).send(error.message);
	}
}

module.exports = login;
