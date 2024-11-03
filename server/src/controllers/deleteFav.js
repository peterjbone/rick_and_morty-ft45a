//const { Favorite } = require("../DB_connection.js");
const { Favorite } = require("../mongodb.js");

async function deleteFav(req, res) {
	const { id } = req.params;

	try {
		await Favorite.destroy({ where: { id } });
		const allFavs = await Favorite.find({});
		return res.status(200).json(allFavs);
	} catch (error) {
		//* 1) Mongoose no encontro al personaje a eliminar
		//* 2) error interno de mongoose
		return res.status(404).send(error.message);
	}
}

module.exports = deleteFav;
