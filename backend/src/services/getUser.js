const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getUser(userID) {
  try {
    const user = await prisma.user.findUnique({
      where: { user_id: userID },
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
        email: true,
        user_type: true,
        registration_date: true,
        profile_picture: true,  // <-- corrigé ici
      },
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    return user;
  } catch (error) {
    console.error("Erreur getUserProfile:", error);
    throw error;
  }
}


module.exports = { getUser };
