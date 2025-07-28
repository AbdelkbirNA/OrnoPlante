const express = require("express");
const router=express.Router();
const {plantHandler,allPlantsHandler} = require("../controllers/getPlantprofil");
const {deletePlant,addplant} = require("../controllers/PlantController")
const upload = require("../middlewares/uploadplant")




router.get("/plants", allPlantsHandler);
router.get("/plant/:id", plantHandler);
router.delete("/plant/:id",deletePlant);
router.post("/addplant", upload.single('image'), addplant);


module.exports=router;