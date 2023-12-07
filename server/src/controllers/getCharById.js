//* NODE SERVER AND PROMISE CONTROLLER
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

//* EXPRESS CONTROLLER

const axios = require("axios")
const URL = "https://rickandmortyapi.com/api/character/" //? rick & morty oficial API REST url

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
} */

//* Using async await

async function getCharByid(req, res) {
	const { id } = req.params
	try {
		const { data } = await axios(`${URL}${id}`)
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
		}
	} catch (error) {
		res.status(500).send("Character Not found")
	}
}

module.exports = getCharByid
