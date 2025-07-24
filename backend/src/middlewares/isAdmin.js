const { getUserProfile } = require("../services/userService");

async function isAdmin(req, res, next) {
  try {
    const userId = req.user.user_id;
    const userProfile = await getUserProfile(userId);

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
