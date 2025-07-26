const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getPlant(plantID) {
  try {
    const plant = await prisma.plant.findUnique({
      where: { plant_id: plantID },
      select: {
        plant_id:true,
        plant_name:true,  // <-- corrigé ici
      },
    });

    if (!plant) {
      throw new Error("plante non trouvé");
    }

    return plant;
  } catch (error) {
    console.error("Erreur getUserProfile:", error);
    throw error;
  }
}

async function getAllPlants() {
  try {
    const plants = await prisma.plant.findMany({
      select: {
        plant_id: true,
        plant_name: true,
        description:true,
        type:true,
        light_requirement:true,
        watering_frequency:true,
        temperature_max:true,
        temperature_min:true,
        photo_url:true,
      },
    });

     if (!plants || plants.length === 0) {
      throw new Error("Aucune plante trouvée");
    }

    return plants;
  } catch (error) {
    console.error("Erreur getAllPlants:", error);
    throw error;
  }
}



module.exports = {getPlant,getAllPlants} ;
