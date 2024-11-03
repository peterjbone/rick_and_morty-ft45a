const { Favorite } = require("../DB_connection.js");

async function postFav(req, res) {
	//console.log(req.body)
	const { id, name, origin, status, image, species, gender } = req.body;

	if ((id, name && origin && status && image && species && gender)) {
		try {
			//* Agrega un nuevo registro a la tabla Favorites y devuelve todos los registros
			const [newFav, created] = await Favorite.findOrCreate({ where: req.body });
			const allFavs = await Favorite.findAll();

			if (created) {
				console.log(`Se creo el registro de ${name.toUpperCase()} en la BD.`);
				return res.status(200).json(allFavs);
			} else {
				console.log(`${name.toUpperCase()} ya estaba en BD.`);
				return res.status(200).json(allFavs);
			}
		} catch (error) {
			//* ALgún error interno de sequelize o algún valor de un atributo/s es incorrecto
			return res.status(500).send(error.message);
		}
	}
	return res.status(400).send("Faltan datos");
}

module.exports = postFav;
