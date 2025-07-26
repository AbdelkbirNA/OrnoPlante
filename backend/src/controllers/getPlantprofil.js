const { getPlant, getAllPlants } = require("../services/getPlant");

async function plantHandler(req, res) {
  try {
    const plantID = parseInt(req.params.id); // ou Number(req.params.id)
    const plant = await getPlant(plantID);
    res.json(plant);
  } catch (error) {
    console.error("Erreur dans plantHandler :", error);
    if (error.message === "plante non trouvé") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Erreur serveur" });
  }
}
async function allPlantsHandler(req, res) {
  try {
    const plants = await getAllPlants();
    res.json(plants);
  } catch (error) {
    console.error("Erreur dans allPlantsHandler :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

module.exports = { plantHandler, allPlantsHandler };
