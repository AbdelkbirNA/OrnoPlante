const express = require("express");
const multer = require("multer");
const { identifyPlant } = require("../controllers/plantnetController");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/identify", upload.single("image"), identifyPlant);

module.exports = router;
