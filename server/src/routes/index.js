const { Router } = require("express");
const router = Router();

//* IMPORTING CONTROLLERS
const postUser = require("../controllers/postUser.js");
const login = require("../controllers/login.js");
const getCharById = require("../controllers/getCharById.js");
const postFav = require("../controllers/postFav.js");
const deleteFav = require("../controllers/deleteFav.js");

//* USING CONTROLLERS
router.post("/register", postUser); // FINALIZADO
router.get("/login", login); // FINALIZADO
router.get("/character/:id", getCharById); // FINALIZADO
router.post("/fav", postFav); // FINALIZADO
router.delete("/fav/:id", deleteFav); // FINALIZADO

module.exports = router;
