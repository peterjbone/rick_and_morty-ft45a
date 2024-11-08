const server = require("./app.js");
const PORT = process.env.PORT || 3001;
const { connectDB } = require("./mongodb.js");

//* Levantar el servidor y conectarlo a la base de datos
server.listen(PORT, async () => {
	try {
		console.log(`Server raised on port ${PORT}`);
		await connectDB();
	} catch (error) {
		console.log(error);
	}
});
