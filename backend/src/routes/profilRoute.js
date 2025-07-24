const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const{ profilHandler }= require("../controllers/getUserProfile");

router.get("/profil",verifyToken,profilHandler);

module.exports=router;