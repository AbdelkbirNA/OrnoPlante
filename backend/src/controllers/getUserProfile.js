const { getUser ,getAllUsers} = require("../services/getUser");

async function profilHandler(req, res) {
  try {
    const userId = req.user.userId;
    const profil = await getUser(userId);
    res.json(profil);
  } catch (error) {
    console.error("Erreur dans profilHandler :", error);  // <-- Log complet ici
    if (error.message === "Utilisateur non trouvé") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Erreur serveur" });
  }
}
async function allusers(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Erreur dans allusers :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

module.exports = { profilHandler,allusers };
