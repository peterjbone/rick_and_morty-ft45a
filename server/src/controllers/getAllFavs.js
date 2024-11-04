require("dotenv").config();
const { Favorite } = require("../mongodb.js");

const getAllFavs = async (req, res) => {
	try {
		const response = await Favorite.find({});
		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
		return res.status(500).send(error.message);
	}
};

module.exports = getAllFavs;