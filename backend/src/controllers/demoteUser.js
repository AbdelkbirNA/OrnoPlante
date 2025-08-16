const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ✅ Rétrograder un admin en utilisateur
async function demoteUser(req, res) {
  const { id } = req.params;

  try {
    const user = await prisma.user.update({
      where: { user_id: parseInt(id) },
      data: {
        user_type: "user",
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
      message: "Administrateur rétrogradé en utilisateur avec succès",
      user,
    });
  } catch (error) {
    console.error("Erreur rétrogradation:", error);
    res.status(500).json({ error: "Erreur lors de la rétrogradation" });
  }
}

module.exports = { demoteUser };
