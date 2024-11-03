const { Router } = require("express");
const router = Router();

//* IMPORTING CONTROLLERS
const getCharById = require("../controllers/getCharById.js");
//const login = require("../controllers/login.js");
//const postUser = require("../controllers/postUser.js");
const postFav = require("../controllers/postFav.js");
const deleteFav = require("../controllers/deleteFav.js");

//* USING CONTROLLERS
router.get("/character/:id", getCharById); //? FINALIZADO
router.post("/fav", postFav);
router.delete("/fav/:id", deleteFav);
//router.post("/login", postUser) //? FINALIZADO
//router.get("/login", login) //? FINALIZADO

module.exports = router;
