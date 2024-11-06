const { Favorite } = require("../mongodb.js");
const { User } = require("../mongodb.js");

async function postFav(req, res) {
	const { userId, character } = req.body;
	const { id, name, origin, status, image, species, gender } = character;

	if ((id, name && origin && status && image && species && gender)) {
		try {
			//? Creando favorito, agg el id del favorito al usuario y devolviendo todos los favoritos del usuario
			const fav = await Favorite.findOne({ id: id, name: name });

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

				const createdFav = await Favorite.findOne({ id: id, name: name });
				await User.findByIdAndUpdate(userId, {
					$push: { favorites: createdFav._id }
				});

				const { favorites } = await User.findById(userId).populate("favorites");
				return res.status(200).json(favorites.reverse());
			} else {
				//? Avisando al usuario que el personaje ya estaba en favoritos y devolviendo todos los favoritos del usuario
				console.log(`${name.toUpperCase()} ya estaba en BD.`);

				const { favorites } = await User.findById(userId).populate("favorites");
				return res.status(200).json(favorites.reverse());
			}
		} catch (error) {
			//* ALgún error interno de mongoose o algún valor de un atributo/s es incorrecto
			return res.status(500).send(error.message);
		}
	}
	return res.status(400).send("Faltan datos");
}

module.exports = postFav;
