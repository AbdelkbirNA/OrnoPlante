const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const{ profilHandler,allusers }= require("../controllers/getUserProfile");

router.get("/profil",verifyToken,profilHandler);
router.get("/users",allusers)


module.exports=router;