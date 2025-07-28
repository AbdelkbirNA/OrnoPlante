const express = require('express');
const router=express.Router();
const {updatedUser,updateUserById} = require("../controllers/updateuser");
const verifyToken =require('../middlewares/verifyToken');
const upload = require("../middlewares/uploadMiddleware")
const { promoteUser } = require("../controllers/promoteUser");

router.put("/user/update",verifyToken,upload.single('profile_picture_file'),updatedUser);

router.put("/user/promote/:id", promoteUser);


module.exports=router;