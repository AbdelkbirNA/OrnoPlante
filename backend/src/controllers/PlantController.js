const {PrismaClient}=require("@prisma/client");
const prisma = new PrismaClient();

 const deletePlant = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPlant = await prisma.plant.delete({
      where: {
        plant_id : parseInt(id),
      },
    });

    res.status(200).json({
      message: 'Plante supprimée avec succès.',
      plant: deletedPlant,
    });
  } catch (error) {
    console.error('Erreur lors de la suppression :', error);
    res.status(500).json({ error: "Erreur lors de la suppression de la plante." });
  }
};

const addplant = async (req, res) => {
  const {
    plant_name,
    description,
    type,
    light_requirement,
    watering_frequency,
    temperature_min,
    temperature_max,
  } = req.body;

  try {
    let photo_url = null;
    if (req.file) {
      // Construire le chemin relatif accessible, par ex. /uploads/plants/nomfichier.jpg
      photo_url = `/uploads/plants/${req.file.filename}`;
    }
    
     const newPlant = await prisma.plant.create({
      data: {
        plant_name,
        description,
        type,
        light_requirement,
        watering_frequency,
         temperature_min: temperature_min ? parseFloat(temperature_min) : null,
        temperature_max: temperature_max ? parseFloat(temperature_max) : null,
        photo_url,
      },
    });
    res.status(201).json({
      message: "Plante ajoutée avec succès.",
      plant: newPlant,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la plante :", error);
    res.status(500).json({ error: "Erreur lors de l'ajout de la plante." });
  }
};








module.exports = {deletePlant,addplant};
