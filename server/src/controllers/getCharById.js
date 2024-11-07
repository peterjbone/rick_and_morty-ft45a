require("dotenv").config();
//* NODE JS
//* Using promises
/* const axios = require("axios")
function getCharByid(res, id) {
	axios(`https://rickandmortyapi.com/api/character/${id}`)
		.then(({ data }) => {
			const character = {
				id: data.id,
				name: data.name,
				gender: data.gender,
				species: data.species,
				origin: data.origin.name,
				image: data.image,
				status: data.status
			}
			return res
				.writeHead(200, { "content-type": "application/json" })
				.end(JSON.stringify(character))
		})
		.catch(error => {
			return res
				.writeHead(500, { "content-type": "text/plain" })
				.end(error.message)
		})
}

module.exports = getCharByid */

//* NODE JS + EXPRESS JS
//* Using promises

/* const getCharByid = (req, res) => {
	const { id } = req.params
	axios(`${URL}${id}`)
		.then(({ data }) => {
			if (data.name) {
				const { status, name, species, origin, image, gender } = data
				return res.status(200).json({
					id: Number(id),
					status,
					name,
					species,
					origin,
					image,
					gender
				})
			} else {
        return res.status(404).send("Not found")
			}
		})
		.catch(error => res.status(500).send(error.message))

    module.exports = getCharByid
  } */

//* NODE JS + EXPRESS JS
//* Using async-await + try-catch

const axios = require("axios");
const { API_URL } = process.env;

async function getCharByid(req, res) {
	const { id } = req.params;
	try {
		//? request to API rickandmorty
		const { data } = await axios.get(`${API_URL}/character/${id}`);
		const { status, name, species, origin, image, gender } = data;
		return res.status(200).json({
			id: Number(id),
			status,
			name,
			species,
			origin: origin.name, //! ojo con esto
			image,
			gender
		});
	} catch (error) {
		console.error(error.message);
		res.status(404).send("Character Not founded.");
	}
}

module.exports = getCharByid;
