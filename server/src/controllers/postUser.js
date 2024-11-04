//? Esta ruta sirve para crear al usuario de prueba desde un API client

//const { User } = require("../DB_connection.js");
const { User } = require("../mongodb.js");

async function postUser(req, res) {
	const { email, password } = req.body;

	try {
		/* 		if (email && password) {
			const [newUser, created] = await User.findOrCreate({
				where: { email, password }
			});
			return created
				? res.status(200).send("El usuario fue creado")
				: res.status(200).send("El usuario ya existe.");
    } */

		if (email && password) {
			const user = await User.findOne({ email: email, password: password });

			// si no encontro el usuario, lo crea
			if (!user) {
				const newUser = new User({ email: email, password: password });
				await newUser.save();
				return res.status(200).send("El usuario fue creado.");
			}

			// si sí encontro al usuario
			return res.status(200).send("El usuario ya existe.");
		}
		return res.status(400).send("Faltan datos");
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

module.exports = postUser;
