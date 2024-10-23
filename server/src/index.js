const server = require("./app.js")
const PORT = 3001
const { conn } = require("./DB_connection.js")

//* Sincronizar la instancia de sequelize al servidor

conn
	.sync({ force: true })
	.then(() => {
		server.listen(PORT, () => console.log(`Server raised on port ${PORT}`))
	})
	.catch((error) => console.error(error.message))
