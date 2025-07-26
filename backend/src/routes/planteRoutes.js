const express = require("express");
const router=express.Router();
const {plantHandler,allPlantsHandler} = require("../controllers/getPlantprofil");

router.get("/plants", allPlantsHandler);

// Route pour récupérer une plante spécifique par id
router.get("/plant/:id", plantHandler);

module.exports=router;