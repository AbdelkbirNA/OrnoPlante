const express=require("express");
const { register, login, getMe } = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");
const checkIfLoggedIn =require('../middlewares/checkIfLoggedIn')
const router=express.Router();

router.post("/register",checkIfLoggedIn, register);
router.post("/login",checkIfLoggedIn, login);
router.get("/me", verifyToken, getMe);

module.exports=router;