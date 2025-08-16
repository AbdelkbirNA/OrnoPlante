const { getUser } = require("../services/getUser");

async function isAdmin(req, res, next) {
  try {
    const userId = req.user.userId;
    const userProfile = await getUser(userId);

    if (userProfile.user_type === "admin") {
      return next();
    }

    return res.status(403).json({ message: "Accès refusé, admin uniquement" });
  } catch (error) {
    console.error("Erreur middleware isAdmin:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

module.exports = isAdmin;
