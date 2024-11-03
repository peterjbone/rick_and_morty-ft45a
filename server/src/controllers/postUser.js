//* Este controller no tiene UI en el frontend
//* Ya que debería tener una página de registro (solo hay de login)
//! Por el momento debes crear usuarios desde un API client (he removido register y login, ya no es util esta ruta)

const { User } = require("../DB_connection.js");

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
