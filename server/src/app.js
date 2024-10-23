//* EXPRESS SERVER
const express = require("express")
const server = express()
const morgan = require("morgan")
const router = require("./routes/index.js")

//* Headers
server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Credentials", "true")
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	)
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
	next()
})

//* Para que express pueda leer body
server.use(express.json())

//* Info de las peticiones HTTP por consola
server.use(morgan("dev"))

//* Manejo de rutas
server.use("/rickandmorty", router)

module.exports = server
