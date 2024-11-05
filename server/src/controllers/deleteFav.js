const { Favorite } = require("../mongodb.js");
const { User } = require("../mongodb.js");

async function deleteFav(req, res) {
	const { id } = req.params;

	try {
		await Favorite.deleteOne({ id: id });
		//User.findByIdAndUpdate();
		const allFavs = await Favorite.find({});
		return res.status(200).json(allFavs.reverse());
	} catch (error) {
		//* 1) Mongoose no encontro al personaje a eliminar
		//* 2) error interno de mongoose
		return res.status(404).send(error.message);
	}
}

module.exports = deleteFav;
