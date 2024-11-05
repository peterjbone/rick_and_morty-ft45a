const { Favorite } = require("../mongodb.js");
const { User } = require("../mongodb.js");

async function postFav(req, res) {
	const { userId, character } = req.body;
	const { id, name, origin, status, image, species, gender } = character;

	if ((id, name && origin && status && image && species && gender)) {
		try {
			const fav = await Favorite.findOne({ id: id, name: name });
			//console.log(fav);

			if (!fav) {
				const newFav = {
					id,
					name,
					origin,
					status,
					image,
					species,
					gender
				};
				await Favorite.create(newFav);
				console.log(`Se creo el registro de ${name.toUpperCase()} en la BD.`);

				// guardando el id de favorito al usuario
				const createdFav = await Favorite.findOne({ id: id, name: name });
				await User.findByIdAndUpdate(userId, {
					$push: { favorites: createdFav._id }
				});

				//! CORREGIR
				//const allFavs = await Favorite.find({});
				//return res.status(200).json(allFavs.reverse());

				const { favorites } = await User.findById(userId).populate("favorites");
				return res.status(200).json(favorites.reverse());
			} else {
				console.log(`${name.toUpperCase()} ya estaba en BD.`);
				const allFavs = await Favorite.find({});
				return res.status(200).json(allFavs.reverse());
			}
		} catch (error) {
			//* ALgún error interno de sequelize o algún valor de un atributo/s es incorrecto
			return res.status(500).send(error.message);
		}
	}
	return res.status(400).send("Faltan datos");
}

module.exports = postFav;
