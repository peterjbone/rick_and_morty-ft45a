const server = require("./app.js")
const PORT = 3001

server.listen(PORT, () => console.log(`Server raised on port ${PORT}`))
