//! Esta ruta ya esta obsoleta ya que elimine el login

const { User } = require("../DB_connection.js");

async function login(req, res) {
	try {
		const { email, password } = req.query;
		if (email && password) {
			//* 1 validacion: que usuario haya dado email y password
			const currentUser = await User.findOne({
				where: { email }
			});

			if (currentUser) {
				//* 2 validación: Sí el email esta registrado
				if (currentUser.password === password) {
					//* 3 validación: Si hay email con esa password
					return res.status(200).json({ access: true });
				}
				return res.json({ access: false, detail: "password" });
			}
			return res.json({ access: false, detail: "email" });
		}
		return res.status(400).send("Faltan datos");
	} catch (error) {
		//* Algún error interno de sequelize
		res.status(500).send(error.message);
	}
}

module.exports = login;
