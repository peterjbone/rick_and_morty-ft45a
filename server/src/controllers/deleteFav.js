const { Favorite } = require("../DB_connection.js")

async function deleteFav(req, res) {
	try {
		const { id } = req.params
		await Favorite.destroy({ where: { id } })
		const allFavs = await Favorite.findAll()
		return res.status(200).json(allFavs)
	} catch (error) {
		//* Sequelize no encontro al personaje a eliminar
		return res.status(404).send(error.message)
	}
}

module.exports = deleteFav
