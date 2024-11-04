//? Esta ruta sirve para crear al usuario de prueba desde un API client

//const { User } = require("../DB_connection.js");
const { User } = require("../mongodb.js");

async function postUser(req, res) {
	try {
		const { email, password } = req.body;
		if (email && password) {
			const [newUser, created] = await User.findOrCreate({
				where: { email, password }
			});
			return created
				? res.status(200).send("El usuario fue creado")
				: res.status(200).send("El usuario ya existe.");
		}
		return res.status(400).send("Faltan datos");
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

module.exports = postUser;
