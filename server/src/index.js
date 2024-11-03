const server = require("./app.js");
const PORT = process.env.PORT || 3001;
const { connectDB } = require("./mongodb.js");
//const { conn } = require("./DB_connection.js");

//* Sincronizar la instancia de sequelize al servidor
/* conn
	.sync({ force: true })
	.then(() => {
		server.listen(PORT, () => console.log(`Server raised on port ${PORT}`))
	})
	.catch((error) => console.error(error.message)) */

//* Levantar el servidor y conectarlo a la base de datos
server.listen(PORT, async () => {
	console.log(`Server raised on port ${PORT}`);
	await connectDB();
});
