require("dotenv").config();
//const { Favorite } = require("../mongodb.js");
const { User } = require("../mongodb.js");

const getAllFavs = async (req, res) => {
	//console.log(req.query);

	const { id } = req.query;

	try {
		const { favorites } = await User.findById(id).populate("favorites");
		return res.status(200).json(favorites.reverse());
	} catch (error) {
		console.log(error);
		return res.status(500).send(error.message);
	}
};

module.exports = getAllFavs;
