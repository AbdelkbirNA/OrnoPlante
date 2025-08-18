const { getPlant } = require("../src/services/getPlant");
const { PrismaClient } = require("@prisma/client");

// On dit à Jest de remplacer la vraie PrismaClient par une fausse
jest.mock("@prisma/client", () => {
  const mPrisma = {
    plant: {
      findUnique: jest.fn(), // on va contrôler ce que renvoie cette fonction
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

describe("Service getPlant", () => {
  let prisma;

  // Avant chaque test, on crée un nouveau "fake Prisma"
  beforeEach(() => {
    prisma = new PrismaClient();
    jest.clearAllMocks(); // reset des mocks pour éviter les interférences
  });

  it("✅ retourne une plante quand elle existe", async () => {
    // 👉 On simule que Prisma trouve une plante
    prisma.plant.findUnique.mockResolvedValue({ plant_id: 1, plant_name: "Rose" });

    // 👉 On appelle la fonction à tester
    const result = await getPlant(1);

    // 👉 On vérifie le résultat
    expect(result).toEqual({ plant_id: 1, plant_name: "Rose" });

    // 👉 On vérifie aussi que Prisma a bien été appelé avec les bons paramètres
    expect(prisma.plant.findUnique).toHaveBeenCalledWith({
      where: { plant_id: 1 },
      select: { plant_id: true, plant_name: true },
    });
  });

  it("❌ lève une erreur si la plante n'existe pas", async () => {
    // 👉 On simule que Prisma ne trouve rien
    prisma.plant.findUnique.mockResolvedValue(null);

    // 👉 Comme getPlant doit lever une erreur, on utilise rejects.toThrow
    await expect(getPlant(99)).rejects.toThrow("plante non trouvé");
  });
});