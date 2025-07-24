const express = require('express');
const router=express.Router();
const {updatedUser} = require("../controllers/updateuser");
const verifyToken =require('../middlewares/verifyToken');
const upload = require("../middlewares/uploadMiddleware")

router.put("/user/update",verifyToken,upload.single('profile_picture_file'),updatedUser);
module.exports=router;