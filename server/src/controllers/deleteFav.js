//const { Favorite } = require("../mongodb.js");
const { User } = require("../mongodb.js");

async function deleteFav(req, res) {
	//const { id } = req.params;
	const { favid, userid } = req.query;

	try {
		/* 		await Favorite.deleteOne({ id: id });
		const allFavs = await Favorite.find({});
		return res.status(200).json(allFavs.reverse()) */

		const result = await User.findByIdAndUpdate(
			userid,
			{ $pull: { favorites: favid } },
			{ new: true }
		);
		//console.log(result);

		const { favorites } = await User.findById(userid).populate("favorites");
		return res.status(200).json(favorites.reverse());
	} catch (error) {
		//* 1) Mongoose no encontro al personaje a eliminar
		//* 2) error interno de mongoose
		console.log(error);
		return res.status(404).send(error.message);
	}
}

module.exports = deleteFav;
