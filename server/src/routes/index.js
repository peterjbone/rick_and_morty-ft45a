const { Router } = require("express")
const indexRouter = Router()

//* IMPORTING THE CONTROLLERS
const login = require("../controllers/login.js")
const getCharById = require("../controllers/getCharById.js")
const { postFav, deleteFav } = require("../controllers/handleFavorites.js")

indexRouter.get("/login", login)
indexRouter.get("/character/:id", getCharById)
indexRouter.post("/fav", postFav)
indexRouter.delete("/fav/:id", deleteFav)

module.exports = indexRouter
