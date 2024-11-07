//? Esta ruta sirve para crear al usuario de prueba desde un API client
const { User } = require("../mongodb.js");

async function postUser(req, res) {
	const { email, password } = req.body;

	try {
		if (email && password) {
			const user = await User.findOne({ email: email, password: password });

			// si no encontro el usuario, lo crea
			if (!user) {
				const newUser = new User({ email: email, password: password });
				await newUser.save();
				return res.status(200).json({ message: "El usuario fue creado." });
			}

			// si sí encontro al usuario
			return res.status(200).json({ message: "El usuario ya existe." });
		}
		return res.status(400).json({ message: "Faltan datos" });
	} catch (error) {
		console.log(error);
		return res.status(500).send(error.message);
	}
}

module.exports = postUser;
