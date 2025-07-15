const express = require('express');
const router=express.Router();
const {updatedUser} = require("../controllers/updateuser");
const verifyToken =require('../middlewares/verifyToken');

router.put("/user/update",verifyToken,updatedUser);

module.exports=router;