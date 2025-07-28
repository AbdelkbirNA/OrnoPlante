const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ✅ Promouvoir un utilisateur en admin
async function promoteUser(req, res) {
  const { id } = req.params;

  try {
    const user = await prisma.user.update({
      where: { user_id: parseInt(id) },
      data: {
        user_type: "admin",
      },
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
        email: true,
        user_type: true,
      },
    });

    res.json({
      message: "Utilisateur promu en admin avec succès",
      user,
    });
  } catch (error) {
    console.error("Erreur promotion:", error);
    res.status(500).json({ error: "Erreur lors de la promotion" });
  }
}

module.exports = { promoteUser };
