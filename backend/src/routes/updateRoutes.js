const express = require('express');
const router=express.Router();
const {updatedUser, changePassword} = require("../controllers/updateuser");
const verifyToken =require('../middlewares/verifyToken');
const upload = require("../middlewares/uploadMiddleware");
const { promoteUser } = require("../controllers/promoteUser");
const { demoteUser } = require('../controllers/demoteUser');
const isAdmin = require('../middlewares/isAdmin');

router.put("/user/update",verifyToken,upload.single('profile_picture_file'),updatedUser);

router.patch("/user/change-password", verifyToken, changePassword);

router.patch("/user/promote/:id", verifyToken, isAdmin, promoteUser);

router.patch("/user/demote/:id", verifyToken, isAdmin, demoteUser);


module.exports=router;