const users = require("../utils/users.js")

function login(req, res) {
	const { email, password } = req.query
	const matchCredentials = users.some(
		user => user.email === email && user.password === password
	)

	//! NO MANDES STATUS AL PEDO, TE ROMPE EL LOGIN
	//! Mandar un status 400 te lo cogera el catch de axios
	//! Si mandas status, manejas el error desde el THEN, pero si lo mandas lo manejas desde CATCH
	return matchCredentials
		? res.status(200).json({ access: true })
		: res.status(401).json({ access: false })
}

module.exports = login
